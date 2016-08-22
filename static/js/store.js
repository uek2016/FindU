(function(f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f();
    } else if (typeof define === "function" && define.amd) {
        define([], f);
    } else {
        var g;
        if (typeof window !== "undefined") {
            g = window;
        } else if (typeof global !== "undefined") {
            g = global;
        } else if (typeof self !== "undefined") {
            g = self;
        } else {
            g = this;
        }
        g.store = f();
    }
})(function() {
    var define, module, exports;
    if (!window.localStorage) return;
    var storage = window.localStorage, store, _api, even_storage = function() {};
    function isJSON(obj) {
        return typeof obj === "object" && Object.prototype.toString.call(obj).toLowerCase() && !obj.length;
    }
    function stringify(val) {
        return val === undefined || typeof val === "function" ? val + "" : JSON.stringify(val);
    }
    function deserialize(value) {
        if (typeof value !== "string") {
            return undefined;
        }
        try {
            return JSON.parse(value);
        } catch (e) {
            return value || undefined;
        }
    }
    function isFunction(value) {
        return {}.toString.call(value) === "[object Function]";
    }
    function isArray(value) {
        return value instanceof Array;
    }
    function Store() {
        if (!(this instanceof Store)) {
            return new Store();
        }
    }
    Store.prototype = {
        // 单个存储或删除字符串数据 store.set(key, data[, overwrite]);可以写为store(key, data);
        //eg: store.set("wcj","1") 或 store("wcj", "1")  //⇒  store.wcj设置为1
        //eg: store.set("wcj")       //⇒  删除wcj及字符串数据
        set: function(key, val) {
            if (!val && !key) {
                return this.remove(key);
            }
            even_storage("set", key, val);
            if (key && val) {
                storage.setItem(key, stringify(val));
            } else if (key && isJSON(key) && !val) {
                for (var a in key) this.set(a, key[a]);
            }
            return this;
        },
        // 获取key的字符串数据
        // store.get(key[, alt])
        // 效果相同store(key)
        //eg: store.get("wcj1") //获取wcj1的字符串数据
        //eg: store("wcj1") //功能同上
        get: function(key) {
            if (!key) {
                var ret = {};
                this.forEach(function(key, val) {
                    ret[key] = val;
                });
                return ret;
            }
            return deserialize(storage.getItem(key));
        },
        // 清空所有key/data 慎用！
        // store.clear() 
        clear: function() {
            this.forEach(function(key, val) {
                even_storage("clear", key, val);
            });
            storage.clear();
            return this;
        },
        // 删除key包括key的字符串数据
        // store.remove(key)
        //eg: store.remove("w1");
        remove: function(key) {
            var val = this.get(key);
            storage.removeItem(key);
            even_storage("remove", key, val);
            return val;
        },
        // 判断是否存在返回true/false
        // store.has(key)
        //eg: store.has("w1"); //⇒true
        has: function(key) {
            return storage.hasOwnProperty(key);
        },
        // 返回所有key的数组
        // store.keys()
        keys: function() {
            var d = [];
            this.forEach(function(k, list) {
                d.push(k);
            });
            return d;
        },
        size: function() {
            return this.keys().length;
        },
        // 循环遍历，返回false结束遍历
        // eg: store.forEach(function(k,d){
        //         console.log(k,d)
        //         if (k== 3) return false
        //     })
        forEach: function(callback) {
            for (var i = 0; i < storage.length; i++) {
                var key = storage.key(i);
                if (callback(key, this.get(key)) === false) break;
            }
            return this;
        },
        // HTML5的本地存储，还提供了一个storage事件，可以对键值对的改变进行监听，使用方法如下
        // if(window.addEventListener){
        //      window.addEventListener("storage",handle_storage,false);
        // }else if(window.attachEvent){
        //     window.attachEvent("onstorage",handle_storage);
        // }
        // function handle_storage(e){
        //     if(!e){e=window.event;}
        // }
        // 事件对象属性有以下4个
        // key 
        // oldValue    
        // newValue    
        // url/uri 
        onStorage: function(cb) {
            if (cb && isFunction(cb)) even_storage = cb;
            return this;
        }
    };
    store = function(key, data) {
        var argm = arguments, _Store = Store(), dt = null;
        if (argm.length === 0) return _Store.get();
        if (argm.length === 1) {
            if (typeof key === "string") return _Store.get(key);
            if (isJSON(key)) return _Store.set(key);
        }
        if (argm.length === 2 && typeof key === "string") {
            if (!data) return _Store.remove(key);
            if (data && typeof data === "string") return _Store.set(key, data);
            if (data && isFunction(data)) {
                dt = null;
                dt = data(key, _Store.get(key));
                return dt ? store.set(key, dt) : store;
            }
        }
        if (argm.length === 2 && isArray(key) && isFunction(data)) {
            for (var i = 0; i < key.length; i++) {
                dt = data(key[i], _Store.get(key[i]));
                store.set(key[i], dt);
            }
            return store;
        }
    };
    for (var a in Store.prototype) store[a] = Store.prototype[a];
    return store;
});
