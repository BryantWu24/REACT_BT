import axios from 'axios';

const openApiRequest = axios.create({
    baseURL: 'http://127.0.0.1:8080/openApi/'
});

const userInfoRequest = axios.create({
    baseURL: 'http://127.0.0.1:8080/auth/userInfo/'
})


/*------------------會員相關------------------*/

// 註冊會員
export const apiOpenApiSetAccount = data => openApiRequest.post('/user/setAccount', data);
// 登入
export const apiOpenApiLogin = data => openApiRequest.post('/user/login', data);
// 取得會員資訊
export const apiAuthUserInfoGet = option => userInfoRequest.get('/get',option);
// 取得目前登入會員
export const apiAuthUserInfoGetOnlineUser = option => userInfoRequest.get('/getOnlineUser',option);


// // User相關的 api
// const userRequest = axios.create({
//     baseURL: 'https://api/user/'
// });


// // 搜尋相關的 api
// const searchRequest = axios.create({
//     baseURL: 'https://api/search/'
// });


// // User 相關的 api
// export const apiUserLogout = data => userRequest.post('/signOut', data);
// export const apiUserSignUp = data => userRequest.post('/signUp', data);

// // 搜尋相關的 api
// export const apiSearch = data => searchRequest.get(`/Search?searchdata=${data}`);
// export const apiSearchType = () => searchRequest.get(`/SearchType`);