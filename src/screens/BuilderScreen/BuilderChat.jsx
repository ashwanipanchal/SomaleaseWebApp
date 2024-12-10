import React,{useState, useEffect, useContext} from 'react'
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, child,  onChildAdded,
    orderByChild,
    remove,
    startAt,
    onValue,
    push,
    query, } from 'firebase/database';
import { GlobalContext } from '../../contexts/GlobalProvider';
import { useLocation } from 'react-router-dom';
import "../TenantScreens/TenantChat.css"
import Header from '../../components/Header';
const firebaseConfig = {
    apiKey: 'AIzaSyCPRw8VL4aXMRedVAMpVTyJtLL8EzTElSY',
    authDomain: 'somaleasespeaker.firebaseapp.com',
    databaseURL: 'https://somaleasespeaker-default-rtdb.firebaseio.com',
    projectId: 'somaleasespeaker',
    storageBucket: 'somaleasespeaker.appspot.com',
    messagingSenderId: '150046181566',
    appId: '1:150046181566:web:94b771d5513ed9f4c136ef',
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebase = getDatabase(app);
// const firestore = initializeFirestore(app, {
//     experimentalForceLongPolling: true,
// });

const BuilderChat = () => {
    const {state} = useLocation()
    console.log(state)
    const [uid , setUid] = useState("")
    const [eachMessage , setEachMessage] = useState("")

    const { globalData, setGlobalData } = useContext(GlobalContext);
    console.log(globalData)
    const [message, setMessage] = useState([]);
    const [groupMessage, setGroupMessage] = useState({});

    // useEffect(() => {
    //     // Function to fetch message from Firebase
    //     const fetchMessage = async (callback) => {
    //       const dbRef = ref(firebase, 'chat/' + state.bridgeid);
    //     //   try {
    //     //     const snapshot = await get(child(dbRef, 'createdAt'));
    //     //     if (snapshot.exists()) {
    //     //         console.log(snapshot.val())
    //     //       setMessage(snapshot.val());
    //     //     } else {
    //     //       console.log("No data available");
    //     //     }
    //     //   } catch (error) {
    //     //     console.error("Error fetching message:", error);
    //     //   }

        

    //         // const onReceive = data => {
    //         //     // alert(JSON.stringify(data))
    //         //     const message = data.val();
    //         //     callback({
    //         //       _id: data.key,
    //         //       text: message.text,
    //         //       //createdAt: new Date(message.createdAt),
    //         //       createdAt: message.createdAt,
    //         //       status: message.status,
    //         //       user_id: message.user_id,
    //         //       anotherid: message.another,
    //         //       image: message.image,
    //         //       end: message.end,
    //         //       follow: message.follow,
    //         //       join: message.join,
    //         //       block: message?.block || '0',
    //         //       blockid: message?.blockid || '0',
    //         //       gift: message?.gift || '0',
    //         //       gift_image: message?.gift_image || '0',
    //         //       animation: message?.animation || '0',
    //         //       user: {
    //         //         _id: message.user._id,
    //         //         name: message.user.name,
    //         //       },
    //         //     });
    //         //   };
    //         //   var today = new Date();
    //         //   var timestamp = new Date(today).toISOString();
          
    //         //   onChildAdded(dbRef, onReceive);
    //     };
    
    //     fetchMessage();
    //   }, []);

    useEffect(() => {
        const user_id = localStorage.getItem("user_id");
        setUid(user_id)
        // Reference to the specific path in your database
        const messageRef = ref(firebase, 'chat/' + state.bridgeid); // Adjust path as needed
    
        // Listen for changes in the database
        onValue(messageRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const messagesArray = [];
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                      // Push each object (message) into the array
                      messagesArray.push({
                        id: key, // You may want to keep the Firebase key
                        ...data[key] // Spread the content of the object
                      });
                    }
                  }
                  


                // Call the function to group messages
                const grouped = groupMessagesByDate(messagesArray);
                console.log(grouped);

                  setMessage(messagesArray); // Update state with the retrieved message
                  setGroupMessage(grouped); // Update state with the retrieved message
          }
        });
    
        // Optionally: Clean up listener on unmount
        return () => {
        //   messageRef.off(); // Remove listener
        };
      }, []);


    // Function to group messages by date
    const groupMessagesByDate = (messages) => {
        const groupedMessages = {};

        messages.forEach((message) => {
            // Get the date part from createdAt
            const date = new Date(message.createdAt).toISOString().split('T')[0];

            // If date doesn't exist in groupedMessages, initialize an empty array
            if (!groupedMessages[date]) {
                groupedMessages[date] = [];
            }

            // Push the message into the respective date group
            groupedMessages[date].push(message);
        });

        return groupedMessages;
    };

    const sendMessage = async() => {
        var today = new Date();
        var timestamp = today.toISOString();
        const messageRef = ref(firebase, 'chat/' + state.bridgeid); 
        push(messageRef, {
            text: eachMessage,
            user: {
                "_id": state?.property_owner_id,
                "name": state?.property_owner_name
              },
            createdAt: timestamp,
            user_id: uid,
            anotherid: state?.user_id,
            status: false,
            // image: z,
            // end: message[i]?.end || '0',
            // follow: message[i]?.follow || '0',
            // join: message[i]?.join || '0',
            // block: message[i]?.block || '0',
            // blockid: message[i]?.blockid || '0',
            // gift: message[i]?.gift || '0',
            // gift_image: message[i]?.gift_image || '0',
            // animation: message[i]?.animation || '0',
          });
          setEachMessage("")
    }

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    };

  return (
    <>
    <Header/>
<div class="container bg-light mt-100">
<div class="row clearfix">
    <div class="col-lg-12">
        <div class="card chat-app">
            <div class="chat">
                <div class="chat-header clearfix">
                    <div class="row">
                        <div class="col-lg-6">
                            <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                                <img src={state?.property_owner_image} alt="avatar"/>
                            </a>
                            <div class="chat-about">
                                <h6 class="m-b-0">{state?.property_owner_name}</h6>
                                {/* <small>Last seen: 2 hours ago</small> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="chat-history">
                    <ul class="m-b-0">
                    {Object.entries(groupMessage).map(([date, messages]) => (
                        <div key={date} style={{ marginBottom: '20px' }}>
                        <h6 style={{ fontWeight: 'bold', marginBottom: '5px', textAlign:'center' }}>{date}</h6>
                        {messages?.map((i) => (
                            // <div key={message.id} style={{ padding: '10px', backgroundColor: '#f0f0f0', marginBottom: '5px', borderRadius: '5px' }}>
                            // <strong>{message.user.name}</strong>
                            // <p>{message.text}</p>
                            // </div>
                            <li class="clearfix">
                            <div className={`message-data ${i.user_id == uid && `text-right`}`}>
                                <span class="message-data-time">{formatTime(i.createdAt)}</span>
                            </div>
                            <div class={`message ${i.user_id == uid ? `other-message float-right` : `my-message`}`}>{i.text}</div>
                        </li>
                        ))}
                        </div>
                    ))}
                        {/* {message?.map((i) => (
                            <li class="clearfix">
                            <div className={`message-data ${i.user_id == uid && `text-right`}`}>
                                <span class="message-data-time">10:10 AM, Today</span>
                            </div>
                            <div class={`message ${i.user_id == uid ? `other-message float-right` : `my-message`}`}>{i.text}</div>
                        </li>
                        ))} */}
                    </ul>
                </div>
                <div class="chat-message clearfix">
                    <div class="input-group mb-0">
                        <input type="text" value={eachMessage} onChange={e => setEachMessage(e.target.value)} class="form-control" placeholder="Enter text here..."/>                                    
                        <div onClick={() => {
                            if(eachMessage == ""){
                                alert("Enter your message!")
                                return
                            }else{
                                sendMessage()
                            }
                            }} class="input-group-prepend">
                            <span class="input-group-text"><i class="fa fa-paper-plane"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>

</>
  )
}

export default BuilderChat