import firebase from "firebase";

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
    setUserName(name) {
        if (this._userID == null) return;

        const userNamePath = "/user/" + this._userId;

        console.log("add name to user " + userNamePath);
        return firebase.database().ref(userNamePath).set({
            name: name
        });
    }

    sentMessageTo(receiverUserId, item) {
        // if (!this._userID || !receiverUserId) return;
        this._userID = "ISEeatjPtJaI2dwi7xebWZMd9Sg2";

        const senderPath = "/user/" + this._userID + "/messages/" + receiverUserId;
        const receiverPath = "/user/" + receiverUserId + "/messages/" + this._userID;
        const senderRef = firebase.database().ref(senderPath);
        const receiverRef = firebase.database().ref(receiverPath);

        senderRef.push({
            text: item,
            sent: true,
        });

        receiverRef.push({
            text: item,
            sent: false,
        });
    }

    getMessagesWith(otherId) {
        this._userID = "ISEeatjPtJaI2dwi7xebWZMd9Sg2";

        const path = "/user/" + this._userID + "/messages/" + otherId;

        const ref = firebase.database().ref(path);
        ref.on("value", function(snapshot) {
            console.log(snapshot.val());
        }, function (error) {
            console.log("Error: " + error.code);
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
