import * as firebase from "firebase";

export default class DataManager {
    static instance = null;

   firebaseConfig = {
        apiKey: "AIzaSyC_jaattGTmzay6T8qcMYOZJGPwcOB7eVE",
        authDomain: "findteacher-1bade.firebaseapp.com",
        databaseURL: "https://findteacher-1bade.firebaseio.com",
        projectId: "findteacher-1bade",
        storageBucket: "findteacher-1bade.appspot.com",
        messagingSenderId: "39740115699",
        appId: "1:39740115699:web:644df834e9edf185"
      };

    _userID = null;

    constructor() {
        // Initialize Firebase
        firebase.initializeApp(this.firebaseConfig);
    }

    static getInstance() {
        if (DataManager.instance == null) {
            DataManager.instance = new DataManager();
        }

        return DataManager.instance;
    }

    /**
     * Sets a users name
     * @param userId
     * @param name
     * @returns {firebase.Promise<any>|!firebase.Promise.<void>}
     */
    setUserName(userId, name) {
        let userNamePath = "/user/" + userId + "/name";

        return firebase.database().ref(userNamePath).set({
            name: name
        });
    }

    getFirebase() {
        return firebase;
    }

    setUserID(uid) {
        this._userID = uid;
    }

    getUserID() {
        return this._userID;
    }
}
