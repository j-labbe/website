---
title: Homelab
date: 2022-09-20T00:34:26.119Z
description: My Homelab journey so far.
image: /img/img_6713.jpg
tags: homelab,linux,unraid
---
Homelab (n.) An ever-changing and experimental computer server or network of servers that allows one to learn, test, and develop new applications and configurations to enable greater functionality and understanding of computer systems.

My experience with building a Homelab began in 2020. The COVID-19 pandemic left me with ample time to evaluate my personal data storage. I have data from past projects, family photos, and other important things that I want to keep safe, while still being able to access them from multiple devices.

As with anyone who accumulates enough data to fill up their primary device, I began to use USB hard drives. For basic data storage, they’re great; cheap storage that you can plug in to any computer. The USB drives worked for a few months, until one day I ran into an issue: my iPhone doesn’t have a USB Type-A port. Now the problem of sharing data between devices became real. I was out of town, with a dead MacBook, and data on a USB hard drive I needed in the moment. I knew the data was somewhere within the 1 TB hard drive, but I had no way of accessing it without a computer.

In this situation, cloud storage would work perfect, provided you are okay with shelling out money for a monthly subscription to store your data somewhere, and you are okay with potentially putting that data at risk. Call me paranoid or a control freak, but I didn’t want my personal files on someone else’s computer where someone (rogue employees, hackers, etc.) could gain access to my data. In theory, any system I was going to adopt should be isolated from the internet.
One could use software like Rclone (https://rclone.org/) to encrypt data before uploading to the cloud, but what’s the fun in that when you’re tech savvy and have some extra time?

I ended up using a spare Raspberry Pi 4 I had lying around from another project, installing OpenMediaVault on it to access my USB hard drives over my home network. In effect, my Pi became a NAS. NASes (looking for the plural here, NASi?) are fantastic due to their simplicity to set up and their ability to serve data to many different devices, if the device you’re connecting from supports protocols like SMB or AFP. 
This worked great for a while. All my files were served on my local Wi-Fi network, making them accessible from both my phone and my laptop. Over time, however, I realized the shortcomings of the Raspberry Pi for NAS applications. Specifically, it’s lack of computing power made it difficult to perform anything but basic tasks, and I quickly realized that if I was going to begin exploring data redundancy, the Pi was just not going to cut it.

I ended up switching back to cloud storage. I tried almost every solution under the sun, but I ultimately kept going back to my USB hard drives. Recurring subscriptions for cloud storage kept increasing in cost because I would max out the storage plan. While at time the cost was only between five and fifteen dollars a month, the long-term costs clearly outweighed the convenience and sometimes lack of privacy that cloud storage has. Additionally, I’m tech savvy, and taking the advanced route is fun when I’m working on small personal projects.

After about a year of using cloud storage, I decided enough was enough. I began researching and putting together a home server build that minimizes costs while still being powerful enough for tasks such as virtual machines and 4K Plex transcoding running simultaneously. Synology NASes are generally only powerful enough for light Plex utilization, and, to my knowledge, do not have support for virtual machines. Leveraging my knowledge of PC building from a few years ago, I decided to build a new server with consumer hardware. My goal was to spend less than the cost of a comparable Synology system that was capable of 4K Plex transcoding.

![](/img/img_6713.jpg)

Here's the list of parts I chose:

* Case: JONSBO N1 – Includes a backplane for drives
* CPU: AMD Ryzen 5 5600G – 8 cores + integrated graphics (for troubleshooting) at a reasonable price
* Motherboard: Asus ROG STRIX B550-I – Has all the features and is reliable
* Memory: G.Skill Ripjaws V 16 GB (2x8 GB) – Cheap (not looking for / supported ECC)
* Storage: 3x Seagate Ironwolf 4TB drives, 2x Kingston 250 GB NVME SSDs
* PSU: Corsair SF 750 – 80+ Platinum rating, modularity, SFX sized, and is MUCH more than needed

Out of all the parts, the case is the most interesting choice. I wanted the server to be portable for when I eventually move, and have it take up as little space as possible to give flexibility where I put it in my house. Additionally, the included hard drive backplane is a nice touch that draws inspiration from enterprise servers. While I don’t anticipate to hot swap drives anytime soon, it could be useful. Given the size of the case, it’s amazing it can fit five full size drives, too.

I chose my hardware in mind for the software I would be running. I could have installed Proxmox or ESXi, spun up a TrueNAS Core or Scale instance, and been off to the races. But, in an attempt to minimize costs (and headaches, since Z-Pools don’t place nicely with mismatched and new drives), and make it less of a headache managing Docker containers, I chose to use Unraid.

Unraid isn’t something I would recommend for Enterprise deployments, however as a tinkerer I don’t mind its sometimes convoluted nature. 
Installing Unraid was a breeze. Just flash a USB stick with a unique UUID (generally this means a new flash drive, not from eBay), plug it in, and you’re good to go. The setup process runs almost entirely in the web app, which you log in with the default username and password on another device.

One thing that is recommended, especially if you plan to open ports for serving content outside your premises is to assign a static LAN IP address to the Unraid machine. It makes it easier to reach the Web UI. If you have a PiHole running, it could also be worthwhile setting up local DNS that points to the Unraid machine.

Once I got my Unraid server up and running, I began configuring it. Adding drives to the Array, including setting up the cache pool with the dual SSDs was my priority. Following best practices, I precleared the disks and checked the clearing with a community plugin called Unassigned Devices. The preclearing process writes a zero to every bit on the disk, which is a perfect stress test for the mechanical drives.

**Warning: do NOT preclear SSDs. All it does is shorten the life of the drive**

When the preclear process was complete, I added everything to the Array, including the cache drives, which get automatically mirrored to protect against data loss.

Once the Array was up and running, I was off to the races!

Since I first began my Unraid server, I have began running many Docker containers, each responsible for one decoupled task of a larger system. Below you can see some of the things I have running.

![](/img/dashboard.png)

My usage of this server is almost daily. I run virtual machines on it for software I use in class, which helps extend the battery of my aging MacBook Pro, since all I do is maintain a connection with VNC. Additionally, I can connect from my phone or laptop to access some cloud services I have tunneled through Cloudflare (this will be a separate post). In short, Cloudflare tunnels allow me to not expose any ports on my home network and proxy all connections to prevent my IP address from being exposed. My home’s service with gigabit internet also helps clients connect without much waiting.
Homelabs are meant to change and evolve over time. I use mine as a semi-production-testing system where I can learn how to create automated backups of critical files to AWS, learn and redo Docker networking, and begin learning the nuances of popular flavors of Linux by using virtual machines that I can break seven times over. The flexibility it provides to me makes it well worth the cost.
I will likely be posting more about my Homelab in the future.