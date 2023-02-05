// ParamObject 类
class ParamObject {
    [prop: string]: any;

    constructor(obj?: Object) {
        for (let key in obj) {
            this[key] = obj[key as keyof Object];
        }
    }

    static getFromString(paramString: string): ParamObject {
        let req = paramString;
        let pObj = new ParamObject();

        if (req.indexOf('?') != -1) {
            let paramArray: string[] = req.substring(1).split('&');
            for (let i = 0; i < paramArray.length; i++) {
                let key = paramArray[i].split('=')[0];
                let val = paramArray[i].split('=')[1];
                pObj[key] = decodeURIComponent(val);
            }
        }
        return pObj;
    }

    static getCurrent(): ParamObject {
        return this.getFromString(location.search);
    }

    toString(): string {
        let pString = '?';
        for (let key in this) {
            pString += key + '=' + this[key] + '&';
        }
        return pString.slice(0, pString.length - 1);
    }
}