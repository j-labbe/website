import getBrowserType from "./getBrowserType";

const isSupported = (nav) => {
    const type = getBrowserType(nav).toLowerCase();
    if(type.split(' ')[0] === 'ie'){
        return false;
    }
    if(type.split(' ')[0] === 'safari' && (Number(type.split(' ')[1]) < 14.1)){
        return false;
    }
    if(type.split(' ')[0] === 'chrome' && (Number(type.split(' ')[1]) < 84)){
        return false;
    }
    return true;
};

export default isSupported;