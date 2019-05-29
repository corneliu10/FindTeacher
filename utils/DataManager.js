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
    setUserName(userId, name) {
        const userNamePath = "/user/" + userId;

        console.log("add name to user " + userNamePath);
        return firebase.database().ref(userNamePath).set({
            name: name
        });
    }

    sentMessageTo(receiverUserId, item) {
        if (!this._userID || !receiverUserId) return;

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

    getMessagesWith(otherId, callback) {
        const path = "/user/" + this._userID + "/messages/" + otherId;

        const ref = firebase.database().ref(path);
        ref.once("value", function (snapshot) {
            snapshot.forEach((childSnapshot) => {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();

                // console.log(childKey);
                // console.log(childData);
                const data = {
                    text: childData.text,
                    sent: childData.sent,
                    key: childKey
                };
                callback(data);
            })
        }, function (error) {
            console.log("Error: " + error.code);
        });
    }

    listenMessagesWith(otherId, callback) {
        const path = "/user/" + this._userID + "/messages/" + otherId;

        firebase.database().ref(path).on('child_added', (snapshot, prevChild) => {
            if (snapshot.val()) {
                const key = snapshot.key;
                const { text, sent } = snapshot.val()

                callback({ text, sent, key });
            }
        });
    }

    searchUsers(userName, callback) {
        let path = "/user/";
        if (userName.length <= 2) return;

        firebase.database().ref(path).once('value', (snapshot) => {
            if (snapshot.key) {
                snapshot.forEach((child) => {
                    const key = child.key;
                    const { name } = child.val();
                    
                    if (name.toLowerCase().includes(userName.toLowerCase())) {
                        // console.log(key);
                        // console.log(name);
                        
                        callback({ key, name });
                    }
                })
            }
        });
    }

    removeListenerWith(otherId) {
        const path = "/user/" + this._userID + "/messages/" + otherId;

        firebase.database().ref(path).off('child_added');
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
