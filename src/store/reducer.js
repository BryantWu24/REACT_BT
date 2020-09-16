import * as actionTypes from './actions';
import config from './../config';

const initialState = {
    isOpen: [], //for active default menu
    isTrigger: [], //for active default menu, set blank for horizontal
    ...config,
    isFullScreen: false, // static can't change
    md_userInfo:{
        account:'Bryant',
        pwd:'123456',
        email:'bryant@mail.com',
        name:'Bryant.Wu'
    },
    md_userAllInfo:{
        data:[
            {
                account:'Bryant',
                pwd:'123456',
                email:'bryant@mail.com',
                name:'Bryant.Wu'
            }
        ]
    },
    md_article_list: {
        data: [{
            id: '01',
            userName: 'Amy',
            avatarUrl: require("../assets/images/user/avatar-1.jpg"),
            updateTime: '2020-09-10 15:05:10',
            createTime: '2020-09-09 12:02:10',
            title: '文章標題1231231223121312132132123131321213132123132132132',
            content: '內文敘述........................................................................................................',
            tags: ['Recreation', 'Food']
        }, {
            id: '02',
            userName: 'Bryant',
            avatarUrl: require('../assets/images/user/avatar-2.jpg'),
            updateTime: '2020-09-10 15:15:10',
            createTime: '2020-09-09 12:12:10',
            title: '文章標題1',
            content: '內文敘述1...',
            tags: ['Education']
        }, {
            id: '03',
            userName: 'Coco',
            avatarUrl: require('../assets/images/user/avatar-3.jpg'),
            updateTime: '2020-08-20 15:05:10',
            createTime: '2020-08-09 12:02:10',
            title: '文章標題3',
            content: '內文敘述3...',
            tags: ['Food', 'Education', 'Accommodation']
        }, {
            id: '04',
            userName: 'Dog',
            avatarUrl: require('../assets/images/user/avatar-4.jpg'),
            updateTime: '2020-08-10 15:05:10',
            createTime: '2020-07-09 12:02:10',
            title: '4文章標題4',
            content: '內文敘述4...',
            tags: ['Education', 'Recreation', 'Clothing']
        }]
    },
    md_article_detail: {

    }

};


const reducer = (state = initialState, action) => {
    let trigger = [];
    let open = [];
    let index = 0;
    let listData = JSON.parse(JSON.stringify(state.md_article_list.data));
    switch (action.type) {
        case actionTypes.COLLAPSE_MENU:
            return {
                ...state,
                collapseMenu: !state.collapseMenu
            };
        case actionTypes.COLLAPSE_TOGGLE:
            if (action.menu.type === 'sub') {
                open = state.isOpen;
                trigger = state.isTrigger;

                const triggerIndex = trigger.indexOf(action.menu.id);
                if (triggerIndex > -1) {
                    open = open.filter(item => item !== action.menu.id);
                    trigger = trigger.filter(item => item !== action.menu.id);
                }

                if (triggerIndex === -1) {
                    open = [...open, action.menu.id];
                    trigger = [...trigger, action.menu.id];
                }
            } else {
                open = state.isOpen;
                const triggerIndex = (state.isTrigger).indexOf(action.menu.id);
                trigger = (triggerIndex === -1) ? [action.menu.id] : [];
                open = (triggerIndex === -1) ? [action.menu.id] : [];
            }

            return {
                ...state,
                isOpen: open,
                    isTrigger: trigger
            };
        case actionTypes.NAV_CONTENT_LEAVE:
            return {
                ...state,
                isOpen: open,
                    isTrigger: trigger,
            };
        case actionTypes.NAV_COLLAPSE_LEAVE:
            if (action.menu.type === 'sub') {
                open = state.isOpen;
                trigger = state.isTrigger;

                const triggerIndex = trigger.indexOf(action.menu.id);
                if (triggerIndex > -1) {
                    open = open.filter(item => item !== action.menu.id);
                    trigger = trigger.filter(item => item !== action.menu.id);
                }
                return {
                    ...state,
                    isOpen: open,
                    isTrigger: trigger,
                };
            }
            return {
                ...state
            };
        case actionTypes.FULL_SCREEN:
            return {
                ...state,
                isFullScreen: !state.isFullScreen
            };
        case actionTypes.FULL_SCREEN_EXIT:
            return {
                ...state,
                isFullScreen: false
            };
        case actionTypes.CHANGE_LAYOUT:
            return {
                ...state,
                layout: action.layout
            };

        case actionTypes.CREATE_ARTICLE:
            let data = action.value.data;
            return Object.assign({}, state, {
                md_article_list: {
                    data: [...state.md_article_list.data, data]
                }
            });
        case actionTypes.ARTICLE_GETDATA:
            let detailData;
            state.md_article_list.data.forEach((v) => {
                if (v.id === action.value.data) {
                    detailData = v;
                }
            })

            return Object.assign({}, state, {
                md_article_detail: detailData
            })
        case actionTypes.ARTICLE_SAVE:
            let saveKey = Object.keys(action.value.data);
            let item;
            for (let v in listData) {
                if (listData[v].id === action.value.data.id) {
                    index = v;
                    item = listData[v];
                    for (let key in item) {
                        if (saveKey.includes(key))
                            item[key] = action.value.data[key];
                    }
                }
            }
            listData[index] = item;
            
            return Object.assign({}, state, {
                md_article_list: {
                    data: listData
                }
            });
        case actionTypes.ARTICLE_DELETE:
            let deleteListData = listData.filter((item) => {
                return item.id !== action.value.data
            })

            return Object.assign({}, state, {
                md_article_list: {
                    data: deleteListData
                }
            });
        default:
            return state;
    }
};

export default reducer;