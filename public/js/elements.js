const CHECKBOX = $('.js-checkbox');

const ADD = $('.js-add-entry');
const ADD_TITLE = $(".js-add-title");
const ADD_START = $(".js-add-start");
const ADD_END = $(".js-add-end");
const ADD_FORM = $('#js-add-form');
const ADD_CATEGORY = $(".js-category");

const UPDATE = $(".js-update-entry");
const UPDATE_TITLE = $(".js-update-title");
const UPDATE_START = $(".js-update-start");
const UPDATE_END = $(".js-update-end");
let UPDATE_ID;

const SAVE = $('#save-button');
const CLEAR = $('#clear-schedule');
const DAYSELECT = $('.js-day-select');
const CANCEL_EDIT = $('#cancel-edit-schedule');
const EDIT_BUTTONS = $('.js-edit-buttons');
const TIME_ENTRY = $('.js-time-entry');
const SCHEDULE = $('.js-schedule')

const LOGIN = $('.js-login');
const LOGIN_BUTTON = $('#js-login-button');
const SIGNUP_BUTTON = $('#js-signup-button');
const SIGNUP_FORM = $('#js-signup-form');
const LOGIN_FORM = $('#js-login-form');
const LOGIN_CANCEL = $('#js-login-cancel');

const SITE_URL = 'http://localhost:8080';

let SESSION_TOKEN = sessionStorage.getItem("authToken");
let USER_ID = sessionStorage.getItem('userId');

let PRODUCTIVE_TIME = {
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
};

let DAY;