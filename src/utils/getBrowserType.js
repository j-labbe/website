// https://stackoverflow.com/questions/5916900/how-can-you-detect-the-version-of-a-browser

const getBrowserType = (nav) => {
    let tem, M, b = nav.userAgent;
    M = b.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(b) || [];
        return 'IE ' + (tem[1] || '');
    }
    if(M[1] === 'Chrome'){
        tem = b.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem !== null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]]: [nav.appName, nav.appVersion, '-?'];
    if((tem = b.match(/version\/(\d+)/i)) !== null) M.splice(1, 1, tem[1]);
    return M.join(' ');
};

export default getBrowserType;