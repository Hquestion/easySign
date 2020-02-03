const axios = require('axios');
const dayjs = require('dayjs');

const User = require('../models/User');
const { APP_SECRET, APP_ID } = require('../config');

module.exports = {
    async findByOpenid(openid) {
        let user = null;
        try {
            user = await User.findOne({
                where: {
                    openid: openid
                }
            });
        } catch (e) {
            user = null;
        }
        return user;
    },
    async createUser(user) {
        let result;
        try {
            result = await User.create(user);
        } catch (e) {
            result = null;
        }
        return result;
    },
    async updateUserById(user, id) {
        let newUser;
        try {
            newUser = await User.update(user, {
                where: {
                    id
                }
            });
        } catch (e) {
            newUser = null;
        }
        return newUser;
    },
    async wxLogin({code, nickName, avatarUrl, gender}) {
        let loginUser;
        try {
            const result = await axios.get("https://api.weixin.qq.com/sns/jscode2session", {
                params: {
                    appid: APP_ID,
                    secret: APP_SECRET,
                    js_code: code,
                    grant_type: "authorization_code"
                }
            });
            if (result && result.data) {
                const user = await this.findByOpenid(result.data.openid);
                if (user) {
                    // 如果已注册，则更新登陆时间
                    await this.updateUserById({
                        last_login: dayjs().toISOString()
                    }, user.id);
                    loginUser = user;
                } else {
                    // 没有则注册
                    loginUser = await this.createUser({
                        nickname: nickName,
                        avatar: avatarUrl,
                        gender,
                        openid: result.data.openid,
                        create_at: dayjs().toISOString(),
                        last_login: dayjs().toISOString()
                    });
                }
            } else {
                loginUser = null;
            }
        }catch (e) {
            loginUser = null;
        }
        return loginUser;
    },
    async createSession() {
        // todo
    }
};
