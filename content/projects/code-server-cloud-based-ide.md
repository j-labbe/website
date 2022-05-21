---
title: Code-Server - Cloud-Based IDE
date: 2022-05-21T12:01:48.762Z
description: Why and how I set uo a cloud-based VSCode instance.
image: /img/vs-code.png
tags: aws,linux,vscode
---
My Integrated Development Environment (IDE) is like a second home. It is setup exactly how I want it with all the extensions and themes that help my productivity and/or make my life slightly easier. Since I spend a lot of time with my main computer and IDE, my workflow (and subsequently my "habits") become accustomed to these creature-comforts. Extensions like Emmett snippets, React and styled-components snippets make development easier and faster.

Sometimes when I'm traveling, however, I may not have my laptop with me, or be able to take it out and use it for a few quick minutes. Being able to pick up where I left off can be crucial for times when an idea comes to mind and I want to make a note or fix an issue. 

Unfortunately, I was one of the unlucky few who became [plagued by the many butterfly switch issues](https://arstechnica.com/gadgets/2018/05/report-butterfly-macbook-pro-keyboards-require-more-frequent-more-expensive-repairs/) affecting some older MacBook Pros. The gap in availability severely slows down my workflow since I would essentially need to rebase my entire codebase on whatever machine I am using, and no longer benefit from many of the time-saving extensions (like snippets). In the case of this repair, it could take up to two weeks to get my laptop back. For those two weeks, I have to somehow make-do with an iPad (not ideal).

This situation created a unique problem. How would I keep my IDE persistent and available across devices, yet still secure enough to not compromise my clients' systems?

[GitHub Codespaces](https://github.com/features/codespaces) was recently released for Organizations and Teams. Of the Organizations I am a member of, I would not want to give any them access to my entire system. I frequently switch between projects, and giving one organization access to another simply is not an option.

My next option was to try and run an IDE locally on my iPad. Many apps on the App Store are pretty decent, especially [CodeSandbox](https://apps.apple.com/us/app/codesandbox/id1423330822). Having a native app is preferable for the obvious performance gains over other solutions. After careful consideration, I realized I couldn't use CodeSandbox. It is a great option, but it doesn't offer all the features I regularly use. My main goal recently has been completing features and fixes as quickly and accurately as possible. To experience as minimal of a slowdown as possible while my laptop is out for repair, I needed another solution.

Alright, enough beating around the bush. What did I end up doing? 

I ended up deploying a [code-server](https://github.com/coder/code-server) instance to AWS, attaching the service to a subdomain I had already created for various development and QA demos.

Code-Server is, as their marketing puts it, VSCode in the browser. Since I am the only one using this instance, it would work as the same IDE on any device I log into. It is the same exact (kind of) application as the Microsoft-distributed version. 

The catch? Certain features present in the Microsoft version are locked behind the TOS. This has a few implications, the most important being the different extension marketplace. Code-Server uses [Open VSX](https://open-vsx.org/), a "third party" VSCode extension registry. While it doesn't have every extension present in Microsoft's marketplace, it has most of them. All my snippet extensions but one were present. The absence of the one snippet (styled-components specific, although Open VSX does have syntax highlighting for styled-components just like Microsoft's registry) is not critical, as I only used it to avoid typing `import styled from "styled-components";` over-and-over.

As you can tell, for my use, it fits fairly well. Obviously the added cost of running it in AWS is a downside, however if configured correctly it is possible to reduce costs and add value to your workflow. If I'm ever somewhere I don't have my laptop but need to punch out a few lines of code, I just need an internet connection and I'm ready to rock.

# Setup

The setup is fairly easy. All you need to get started is access to the command-line and an AWS account. This *could* be done on an iPad or other tablet, but in my experience it's simply easier on a computer.

You'll also need to install the AWS CLI and have it configured. [Instructions can be found here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

## 1. Launch EC2 Instance

Code-server recommends, at a minimum, the following specs:

- 1GB of RAM
- 2 CPU cores

I tried using code-server with 1GB of RAM and 1 CPU core, but it often became sluggish and unresponsive. Simply installing a normal amount of packages via npm wouldn't work. I had to force reboot my instance many times, and it simply wasn't worth saving a few extra bucks for much worse performance.

I settled on the `t2.medium` tier for now because it meets the minimum specifications, and I have found it to work decently well. If you require extra CPU performance from time-to-time, but don't want to upgrade to more cores, you can use the `t3` tier, which features burstable performance at any time. You can read more about T3 [here](https://aws.amazon.com/ec2/instance-types/t3/).

Before we create our EC2 instance, make sure you get the following information:

- AMI ID specific for your region. Make sure the image is Ubuntu (bionic) (18.04 LTS is what is current as of writing this).
- Compatible instance type (I went over this earlier)
- VPC ID and Subnet ID where the instance will launch (can be obtained via `aws ec2 describe-vpcs` or by creating a new VPC)
- Security Group ID that will be assigned to the instance. You can create a new one if you don't have one (just do it before continuing these steps).
- Key-pair name. This will be used later to SSH into our EC2 instance, so pick a unique name that is relevant for you.
- [**Read the docs to see any other configuration parameters**](https://docs.aws.amazon.com/cli/latest/reference/ec2/run-instances.html)

### Step 1: Create a Security Group

Our EC2 instance requires a security group in order to be created. If you already have a security group setup, skip this step. At the minimum, let's specify the name, description, and a few rules.

```sh
# Create the Security Group
aws ec2 create-security-group --group-name code-server-sg --description "Security group for code-server"

# Allow SSH access
aws ec2 authorize-security-group-ingress --group-name code-server-sg --protocol tcp --port 22 --cidr 0.0.0.0/0
# WARNING! It isn't good practice to expose SSH access to the internet. For the sake of these instructions, we're leaving it open. Use a VPN or your home IP Address in place to help secure the system.

# Allow HTTP traffic
aws ec2 authorize-security-group-ingress --group-name code-server-sg --protocol tcp --port 80 --cidr 0.0.0.0/0

# Allow HTTPS traffic
aws ec2 authorize-security-group-ingress --group-name code-server-sg --protocol tcp --port 443 --cidr 0.0.0.0/0
```

### Step 2: Create key-pair

In order to SSH into our EC2 instance, we will need to use a key-pair. It's essentially a password-file that gives us SSH access to the instance.

```sh
aws ec2 create-key-pair --key-name code-server-key-pair
```

### Step 3: Launch the EC2 Instance

Make sure you have all of the information mentioned before handy. This is where we need it.

```sh
aws ec2 run-instances --image-id <your-ami-id> --instance-type t2.medium --count 1 --subnet-id <your-subnet-id> --security-group-ids <your-sg-id> --key-name code-server-key-pair --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=codeserver}]'
```

What's going on here? What's all this gibberish? Let me break it down.

**--image-id**

This is the image that will be used to launch the EC2 instance. As previously mentioned, it should be an Ubuntu image, specific to the region you're launching your EC2 instance in.

**--instance-type**

This is the instance tier, as previously discussed.

**--count 1**

Launch only 1 instance.

**--subnet-id**

The subnet the EC2 instance will be attached to.

**--security-group-ids**

Security group ID you would like to attach to the EC2 instance.

**--key-name**

The name of the key-pair we just created, specific for code-server.

**--tag-specifications**

In the above example, we are giving the EC2 instance a tag called "Name" with a value of "codeserver". This makes it easier to identify in the CLI and the Console.

### Step 4: Create the Storage & Attach to the EC2 Instance

We need a place to store all of our files, obviously! My current server uses 50gb (which is overkill, I know, but I wanted a "set-and-forget" solution, and storage is cheap).

```sh
# I am launching in us-east-1c, adjust accordingly
aws ec2 create-volume --availability-zone us-east-1c --size 50 --tag-specifications 'ResourceType=volume,Tags=[{Key=Name,Value=codeserver-volume}]'
```

Now let's attach the newly created volume to the EC2 instance that was just created.

```sh
aws ec2 attach-volume --instance-id <ec2-id> --volume-id <volume-id> --device /dev/sda1
```

If you forgot the EC2 instance ID, you can find it by running `aws ec2 describe-instances`.

The storage volume should be attached to the EC2 instance now.

### Step 5: Elastic IP

The public IP address associated with the EC2 instance that was just created is a dynamic IP address, which means it is subject to change. When pointing a domain to the EC2 instance, the IP should remain the same. We need to allocate an Elastic IP address. There is an additional cost for some Elastic IPs, but generally your first Elastic IP is free. Read more about it [here](https://docs.aws.amazon.com/cli/latest/reference/ec2/allocate-address.html).

```sh
# I usually just run it without any options.
aws ec2 allocate-address
```

Now that the address allocated, we need to associate it with the EC2 instance. To do this, run the below command:

```sh
aws ec2 associate-address --instance-id <ec2-id> --allocation-id <your-eip-alloc-id>
```

### Step 6: Point a Domain

This step will vary based on your DNS provider. 

Create a new A record for the domain or subdomain.

"@" means the root, whereas something like "ide" in the value field will route ide.example.com to the EC2 instance. My code-server is pointed from multiple subdomains.

While you're configuring DNS records, point `3000.[your-code-server-domain]` to your EIP as well. We will configure this later to show any web server preview that is run in code-server on port 3000 (via VSCode integrated terminal).

## 2. Configure Instance

### Step 1: SSH

Grab the key-pair file created previously and open your command line.

Enter the following command to gain access to the EC2 instance we just created.

```sh
ssh ubuntu@[your-eip-or-domain] -i /path/to/key/pair.pem
```

Accept any fingerprints sent by typing "yes".

You're in!

### Step 2: Install NGINX
We are using NGINX to handle our HTTP routing. While it is possible to use code-server without it, it will be required to use HTTPS.

First, let's update our instance's system.

```sh
sudo apt update
sudo apt upgrade
```

This may take awhile, don't worry.

In addition to installing NGINX, we are also going to install certbot, the program that will allow us to obtain the certificates for HTTPS.
When it's done installing, we're going to configure NGINX.

```sh
sudo apt install -y nginx certbot python3-certbot-nginx
sudo systemctl stop nginx
sudo nano /etc/nginx/nginx.conf
```

NGINX configs can become very complicated. Below is a copy of my entire config. Don't worry, I'll break it down afterwards.

```
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
        worker_connections 768;
}

http {

        sendfile on;
        tcp_nopush on;
        types_hash_max_size 2048;

        include /etc/nginx/mime.types;
        default_type application/octet-stream;

        ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
        ssl_prefer_server_ciphers on;

        access_log /var/log/nginx/access.log;
        error_log /var/log/nginx/error.log;

        gzip on;

	    include /etc/nginx/conf.d/*.conf;
        include /etc/nginx/sites-enabled/*;

        ############ USER CONFIGURED ##############

        server {
                listen       443 ssl http2;
                listen       [::]:443 ssl http2;
                server_name  3000.ide.yourdomain.com;

                ssl_certificate "/etc/letsencrypt/live/3000.ide.yourdomain.com/fullchain.pem";
                ssl_certificate_key "/etc/letsencrypt/live/3000.ide.yourdomain.com/privkey.pem";
                ssl_protocols TLSv1.2 TLSv1.3;
                ssl_ciphers ECDH+AESGCM:ECDH+AES256:ECDH+AES128:DH+3DES:!ADH:!AECDH:!MD5;

                ssl_session_cache shared:SSL:1m;
                ssl_session_timeout  10m;
                ssl_prefer_server_ciphers on;

                location / {
                        proxy_pass http://localhost:8080$request_uri;
                        proxy_set_header Host $host;
                        proxy_set_header Upgrade $http_upgrade;
                        proxy_set_header Connection upgrade;
                        proxy_set_header Accept-Encoding gzip;
                }
        }

        server {
                listen       443 ssl http2;
                listen       [::]:443 ssl http2;
		        server_name  ide.yourdomain.com;

                ssl_certificate "/etc/letsencrypt/live/ide.yourdomain.com/fullchain.pem";
                ssl_certificate_key "/etc/letsencrypt/live/ide.yourdomain.com/privkey.pem";
                ssl_protocols TLSv1.2 TLSv1.3;
                ssl_ciphers ECDH+AESGCM:ECDH+AES256:ECDH+AES128:DH+3DES:!ADH:!AECDH:!MD5;

                ssl_session_cache shared:SSL:1m;
                ssl_session_timeout  10m;
                ssl_prefer_server_ciphers on;

                location / {
                        proxy_pass http://localhost:8080/;
                        proxy_set_header Host $host;
                        proxy_set_header Upgrade $http_upgrade;
                        proxy_set_header Connection upgrade;
                        proxy_set_header Accept-Encoding gzip;
                }
        }

        server {
                listen 80;
                listen [::]:80;
                
                server_name ide.yourdomain.com;
                return 301 https://$host$request_uri;
        }
}
```

Looks scary. Don't worry, much of it is system-generated. Let's break it down.

#### **Server Block 1**

The first server block after the user generated comment is for our preview domain. It contains all of the options required to connect to any previews via HTTPS.

Important notes:

- Note the `ssl_certificate` and `ssl_certificate_key` paths. These files will be created later when we use certbot to generate our SSL certificates.
- Note that any HTTP (non-HTTPS) traffic will not be able to connect

Code-server supports domain proxying, which basically allows us to access any web servers that are started on port 3000 in VSCode's integrated terminal via an independent link. In the above config, that would be `3000.ide.yourdomain.com`. For more information, read [the docs](https://coder.com/docs/code-server/latest/guide#using-a-subdomain).

What is important to note is the location block. We are routing all of the traffic at 3000.ide.yourdomain.com to code-server, which runs on our EC2 instance on port 8080.

#### **Server Block 2**

The second server block defines the HTTPS connection to our IDE. We want all of our traffic to our IDE to be over HTTPS. Much like the first server block, this config pulls SSL certificates from a path that is not yet defined. **_These certificates are different than the previous certificates_**.

#### **Server Block 3**

The third and final server block simply redirects any insecure HTTP traffic to HTTPS, since we want all traffic to be secure.

That's really it for the config.

Let's finish setup.

### Step 3: Generate SSL Certificates

Run the below command to generate certificates for NGINX to start using:

```sh
sudo certbot certonly --standalone -d ide.yourdomain.com
sudo certbot certonly --standalone -d 3000.ide.yourdomain.com
```

Once you follow the on-screen prompts, the certificates should be generated and we'll be ready to roll.

At this point you can start NGINX back up again with:

```sh
sudo systemctl start nginx
```

NGINX should also start every time the system starts up. We can use the below command to accomplish that:

```sh
sudo systemctl enable nginx
```

### Step 4: Code-Server

Now that NGINX is setup, let's get code-server setup so we can begin to use VSCode in any browser.

Let's first run the install script. I like to start and stop code-server just to ensure everything starts correctly, so we'll do that too.

```sh
curl -fsSL https://code-server.dev/install.sh | sh
code-server
```

Now that code-server is installed, let's configure everything to work. 

Since this EC2 instance will be used primarily for code-server, I wanted it to launch code-server on boot. Setting that up takes a little extra effort, but lucky for you I have it all planned out into steps.

**1. Move config**

Right now our code-server config is at `~/.config/code-server/config.yaml`
We want it to be available even if the user isn't logged in, so let's move it. I chose `/etc/jacklabbe`, as it's a system route that likely no other application will ever use. Just be sure to remember where you put your config file.

**2. Create systemd service**

Creating a systemd service for code-server will allow us to add some extra config options, while still enabling it to start on boot.

First, create the service:
```sh
sudo touch /etc/systemd/system/jacklabbecs.service
sudo nano /etc/systemd/system/jacklabbecs.service
# Note: you can name it anything you wish, as long as it won't conflict with any other applications
```

Now that we're editing the service, input the following (again, I'll break it down):

```sh
[Unit]
Description=Start code-server when the system starts up

[Service]
ExecStart=/usr/bin/code-server --proxy-domain ide.yourdomain.com --config /etc/jacklabbe/code-server-config.yaml
Type=oneshot
RemainAfterExit=yes
User=ubuntu

[Install]
WantedBy=multi-user.target
```

**Unit**

Description is self-explanatory.

**Service**

*ExecStart* - this is the command that will run when our service is started. When we type `code-server` into our command prompt, we are really executing a link to an executable file (called an *alias*)

The rest of this you can leave as-is. There are many options you can choose, but this config has worked fine for me.

Make sure to change the `--proxy-domain` and `--config` arguments before saving.

Once you have that file saved, we can enable to start at boot via:

```sh
sudo systemctl enable jacklabbecs.service
```

Code-server should now start at boot. The easiest way to test this is to go into the AWS Console and reboot the instance, or you can run:

```sh
aws ec2 reboot-instances --instance-id <instance-id>
# Note: this command is asynchronous, and may not immediately reboot the instance
```

If you'd like to start your code-server without rebooting the instance, or if you would like to restart your code-server, you can type:

```sh
# Start
sudo systemctl start jacklabbecs.service # or whatever you named the service

# Restart
sudo systemctl restart jacklabbecs.service # or your service name
```

### That's it!

You should have a code-server instance deployed in AWS EC2 that will automatically start up when the instance ever reboots.

Sometimes while using code-server, you might experience disconnections. I notice this happening when I run a production build for a large webpack project with several webpack plugins. If the CPU usage gets too high, code-server will stop responding. 

T3 tiers help address this issue with burstable performance on-demand, however I often use hot-reloads with webpack, and didn't want to run the risk of accruing additional costs. That's why I stuck with t2.medium.

If you have any issues during setup, I recommend referring to [the docs](https://coder.com/docs/code-server/latest/guide). The documentation, however, assumes we are using Debian hosted on Google Cloud, so you may have to translate between the two operating systems.