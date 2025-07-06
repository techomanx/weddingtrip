import React, { useState } from 'react';

// --- Itinerary Data ---
// This array holds all the events of the trip, now including weather forecasts.
// The weather is based on historical averages for late August.
const itineraryData = [
  // Wednesday, August 20, 2025: Travel Day
  {
    day: "Wednesday, August 20, 2025",
    theme: {
      headerBg: '#2980b9',
      iconBg: '#3498db'
    },
    weather: {
        summary: "Travel Day: Mild in London, warm and sunny in Bulgaria.",
        temp: "16°C ➔ 27°C",
        icon: "✈️"
    },
    events: [
      { time: "05:00", activity: "Wake Up & Final Packing", description: "Time to get ready for the trip ahead. Final check for passports and documents.", icon: "⏰" },
      { time: "05:45", activity: "Taxi to London Heathrow (LHR)", description: "Depart from Dulwich. The journey should take about 1 hour to 1h 15m at this time.", icon: "🚖" },
      { time: "07:00", activity: "Arrive at Heathrow Terminal 5", description: "Time for baggage drop and to go through security.", icon: "🛄" },
      { time: "07:45", activity: "Airport Breakfast", description: "Grab a coffee and some food post-security.", icon: "☕" },
      { time: "08:15", activity: "Go to Gate", description: "Head towards the departure gate.", icon: "🚶‍♂️" },
      { time: "09:00", activity: "Flight BA890 Departs for Sofia (SOF)", description: "Flight duration is approximately 3 hours. Enjoy the flight!", icon: "✈️" },
      { time: "14:15", activity: "Land at Sofia Airport (SOF)", description: "Welcome to Bulgaria! (Time is GMT+3).", icon: "🛬" },
      { time: "14:45", activity: "Passport Control & Baggage Claim", description: "Proceed through immigration and collect your luggage.", icon: "🛂" },
      { time: "15:15", activity: "Pick up Rental Car", description: "Head to the rental desks in the arrivals hall.", icon: "🚗" },
      { time: "15:45", activity: "Begin Drive to Belite Skali", description: "Set the GPS and start the scenic 3-hour drive.", icon: "🗺️" },
      { time: "17:15", activity: "Quick Stop", description: "A short 15-minute break for coffee or to stretch your legs.", icon: "🥤" },
      { time: "19:00", activity: "Arrive at Eco complex 'Belite Skali'", description: "You've made it! Check into your room.", icon: "🏨" },
      { time: "19:45", activity: "Relax & Unwind", description: "Settle in and freshen up.", icon: "😌" },
      { time: "20:30", activity: "Dinner at the Hotel", description: "Enjoy a relaxed dinner at the complex's restaurant.", icon: "🍽️" },
      { time: "22:00", activity: "Early Night", description: "Get a good night's sleep before the big day.", icon: "😴" },
    ]
  },
  // Thursday, August 21, 2025: Wedding Day
  {
    day: "Thursday, August 21, 2025",
    theme: {
      headerBg: '#8e44ad',
      iconBg: '#9b59b6'
    },
    weather: {
        summary: "Sunny and warm, perfect for a wedding!",
        temp: "28°C / 14°C",
        icon: "☀️"
    },
    events: [
      { time: "09:00", activity: "Leisurely Breakfast", description: "Enjoy a relaxed breakfast at the hotel.", icon: "🥞" },
      { time: "10:00", activity: "Explore the Complex", description: "Take a short walk around the beautiful nature reserve.", icon: "🌳" },
      { time: "11:00", activity: "Get Ready", description: "Time to start preparing for the wedding celebrations.", icon: "👔👗" },
      { time: "13:00", activity: "Wedding Ceremony: Bride Stealing", description: "The festivities begin with a traditional ceremony.", icon: "👰" },
      { time: "14:00", activity: "Wedding Ceremony: Civil Ceremony", description: "The official marriage ceremony.", icon: "📜" },
      { time: "16:00", activity: "Wedding Ceremony: Church Ceremony", description: "A beautiful ceremony at the church.", icon: "⛪" },
      { time: "18:00", activity: "Welcome Drink", description: "Mingle with guests and enjoy a pre-reception drink.", icon: "🥂" },
      { time: "19:00", activity: "Reception", description: "Dinner, dancing, and celebrating with the happy couple!", icon: "🎉", geminiFeature: "toast" },
    ]
  },
  // Friday, August 22, 2025: Departure
  {
    day: "Friday, August 22, 2025",
    theme: {
      headerBg: '#16a085',
      iconBg: '#1abc9c'
    },
    weather: {
        summary: "Departure Day: Sunny morning in Bulgaria, mild evening in London.",
        temp: "26°C ➔ 17°C",
        icon: "🛫"
    },
    events: [
      { time: "07:00", activity: "After-Wedding Breakfast", description: "Join the newlyweds and guests for a final breakfast.", icon: "🍳" },
      { time: "09:30", activity: "Final Packing & Check-out", description: "Pack your bags and check out from the hotel.", icon: "🧳" },
      { time: "10:30", activity: "Depart for Sofia Airport", description: "Begin the 3-hour drive back to Sofia.", icon: "🚗" },
      { time: "13:30", activity: "Arrive at Sofia Airport & Return Car", description: "Drop off the rental car and head to the departures terminal.", icon: "🛫" },
      { time: "14:15", activity: "Baggage Drop & Security", description: "Check your bags and go through airport security.", icon: "✅" },
      { time: "15:30", activity: "Late Lunch at Airport", description: "Grab a bite to eat before your flight.", icon: "🍔" },
      { time: "16:55", activity: "Flight BA891 Departs for London (LHR)", description: "Time to fly home.", icon: "✈️" },
      { time: "18:15", activity: "Land at London Heathrow", description: "Welcome back to London! (Local time).", icon: "🛬" },
      { time: "19:00", activity: "Passport Control & Baggage Claim", description: "Clear immigration and collect your luggage.", icon: "🛄" },
      { time: "19:45", activity: "Travel back to Dulwich", description: "Take the Tube, Heathrow Express, or a taxi home.", icon: "🏡" },
      { time: "21:00", activity: "Home Sweet Home", description: "The end of a wonderful wedding trip!", icon: "😌" },
    ]
  }
];

// --- Gemini API Helper ---
const callGeminiAPI = async (prompt, jsonSchema = null) => {
    const apiKey = ""; // Keep this empty, Canvas will handle it.
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const payload = {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {}
    };

    if (jsonSchema) {
        payload.generationConfig.responseMimeType = "application/json";
        payload.generationConfig.responseSchema = jsonSchema;
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const text = result.candidates[0].content.parts[0].text;
            return text;
        } else {
            console.error("Unexpected API response structure:", result);
            throw new Error("Could not extract text from Gemini response.");
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return `Error: ${error.message}. Please check the console for more details.`;
    }
};


// --- Modal Components ---

const PackingAssistantModal = ({ closeModal }) => {
    const [packingList, setPackingList] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getPackingSuggestions = async () => {
        setIsLoading(true);
        setError(null);
        setPackingList(null);

        const prompt = `Based on a 3-day trip from London to a rural, scenic part of Bulgaria (near Gotse Delchev) in late August for a wedding, please generate a personalized packing list. The weather will be warm and sunny, around 27-28°C during the day and cooler in the evenings around 14°C. The event includes a formal wedding ceremony and reception, as well as opportunities for light outdoor exploration. Provide a practical list.`;
        
        const schema = {
            type: "OBJECT",
            properties: {
                clothing: {
                    type: "ARRAY",
                    items: { type: "STRING" }
                },
                toiletries: {
                    type: "ARRAY",
                    items: { type: "STRING" }
                },
                documents_and_money: {
                    type: "ARRAY",
                    items: { type: "STRING" }
                },
                miscellaneous: {
                    type: "ARRAY",
                    items: { type: "STRING" }
                }
            },
            required: ["clothing", "toiletries", "documents_and_money", "miscellaneous"]
        };

        const response = await callGeminiAPI(prompt, schema);
        setIsLoading(false);

        try {
            const parsedResponse = JSON.parse(response);
            setPackingList(parsedResponse);
        } catch (e) {
            setError("Failed to get packing suggestions. The model returned an unexpected format.");
            console.error("Parsing Error:", e, "Raw Response:", response);
        }
    };

    return (
        <div style={styles.modalBackdrop}>
            <div style={styles.modalContent}>
                <button onClick={closeModal} style={styles.closeButton}>&times;</button>
                <h2>✨ Packing Assistant</h2>
                <p>Get a personalized packing list for your trip, powered by Gemini.</p>
                <button onClick={getPackingSuggestions} disabled={isLoading} style={styles.geminiButton}>
                    {isLoading ? "Generating..." : "Get Packing Suggestions"}
                </button>

                {isLoading && <div style={styles.loader}></div>}
                {error && <p style={{color: 'red'}}>{error}</p>}

                {packingList && (
                    <div style={styles.packingListContainer}>
                        {Object.entries(packingList).map(([category, items]) => (
                            <div key={category}>
                                <h4 style={styles.packingCategory}>{category.replace(/_/g, ' ').toUpperCase()}</h4>
                                <ul style={styles.packingList}>
                                    {items.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const ToastHelperModal = ({ closeModal }) => {
    const [keywords, setKeywords] = useState('');
    const [toast, setToast] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);

    const generateToast = async () => {
        if (!keywords.trim()) {
            setError("Please enter some keywords.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setToast('');

        const prompt = `Write a short, heartfelt, and slightly humorous wedding toast (around 100-150 words). The couple's names are Teodora and Simeon. Use the following keywords as inspiration for the toast: "${keywords}".`;
        
        const response = await callGeminiAPI(prompt);
        setIsLoading(false);
        setToast(response);
    };
    
    const copyToClipboard = () => {
        const el = document.createElement('textarea');
        el.value = toast;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={styles.modalBackdrop}>
            <div style={styles.modalContent}>
                <button onClick={closeModal} style={styles.closeButton}>&times;</button>
                <h2>✨ Wedding Toast Helper</h2>
                <p>Stuck on what to say? Give Gemini a few keywords and let it help you draft a toast.</p>
                
                <textarea
                    style={styles.textarea}
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="e.g., childhood friends, hiking trip, always laughing, wish them happiness..."
                />

                <button onClick={generateToast} disabled={isLoading} style={styles.geminiButton}>
                    {isLoading ? "Drafting..." : "Help Me Write a Toast!"}
                </button>

                {isLoading && <div style={styles.loader}></div>}
                {error && <p style={{color: 'red'}}>{error}</p>}

                {toast && (
                    <div style={styles.toastResultContainer}>
                        <h4>Here's a draft:</h4>
                        <p style={styles.generatedToast}>{toast}</p>
                        <button onClick={copyToClipboard} style={styles.copyButton}>
                            {copied ? 'Copied!' : 'Copy to Clipboard'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};


// --- Google Maps Component ---
const GoogleMapsEmbed = () => {
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d382218.4255716382!2d23.11181639943568!3d42.02980590815777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x40aa8682cb317bf5%3A0x400a01269bf5160!2sSofia%20Airport%20(SOF)%2C%20bul.%20%22Christopher%20Columbus%22%201%2C%201540%20Sofia%2C%20Bulgaria!3m2!1d42.6953247!2d23.4079529!4m5!1s0x14a9544158466e07%3A0x7d6c6fa66f1201ce!2sBelite%20Skali%20Eco%20Complex%2C%20Sveti%20Petar%20Area%2C%20Gaitaninovo%2C%20Bulgaria!3m2!1d41.4285891!2d23.6335191!5e0!3m2!1sen!2suk!4v1688539265841!5m2!1sen!2suk";
  
  return (
    <div style={styles.mapContainer}>
      <h3 style={styles.subHeader}>The Drive: Sofia Airport to Belite Skali</h3>
      <iframe
        src={mapUrl}
        style={styles.mapIframe}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Sofia to Belite Skali Driving Route"
      ></iframe>
    </div>
  );
};


// --- Main App Component ---
function App() {
    const [isPackingModalOpen, setPackingModalOpen] = useState(false);
    const [isToastModalOpen, setToastModalOpen] = useState(false);

  return (
    <>
      {isPackingModalOpen && <PackingAssistantModal closeModal={() => setPackingModalOpen(false)} />}
      {isToastModalOpen && <ToastHelperModal closeModal={() => setToastModalOpen(false)} />}

      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>Wedding Trip Itinerary</h1>
          <p style={styles.headerSubtitle}>Teodora & Simeon | August 20-22, 2025</p>
          <button onClick={() => setPackingModalOpen(true)} style={{...styles.geminiButton, marginTop: '20px'}}>
            ✨ Packing Assistant
          </button>
        </div>

        {itineraryData.map((dayPlan, index) => (
          <div key={index} style={styles.dayContainer}>
            <div style={{...styles.dayHeader, backgroundColor: dayPlan.theme.headerBg}}>
              <div style={styles.dayHeaderText}>{dayPlan.day}</div>
              <div style={styles.weatherContainer}>
                  <span style={styles.weatherIcon}>{dayPlan.weather.icon}</span>
                  <span style={styles.weatherTemp}>{dayPlan.weather.temp}</span>
                  <span style={styles.weatherSummary}>{dayPlan.weather.summary}</span>
              </div>
            </div>
            <div style={styles.timeline}>
              <div style={styles.timelineConnector}></div>
              {dayPlan.events.map((event, eventIndex) => (
                <div key={eventIndex} style={styles.event}>
                  <div style={styles.eventTimeContainer}>
                    <div style={styles.eventTime}>{event.time}</div>
                  </div>
                  <div style={{...styles.eventIconContainer, backgroundColor: dayPlan.theme.iconBg}}>
                      <div style={styles.eventIcon}>{event.icon}</div>
                  </div>
                  <div style={styles.eventDetails}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <p style={styles.eventActivity}>{event.activity}</p>
                        {event.geminiFeature === 'toast' && (
                            <button onClick={() => setToastModalOpen(true)} style={styles.toastButton}>
                                ✨ Toast Helper
                            </button>
                        )}
                    </div>
                    <p style={styles.eventDescription}>{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <GoogleMapsEmbed />
      </div>
    </>
  );
};

// --- Styling ---
const styles = {
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: '#f4f7f6',
    color: '#333',
  },
  header: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '30px 20px',
    textAlign: 'center',
  },
  headerTitle: { margin: 0, fontSize: '2.5rem' },
  headerSubtitle: { margin: '5px 0 0', fontSize: '1.2rem', fontWeight: 300, color: '#bdc3c7' },
  dayContainer: { margin: '0 auto', padding: '20px', maxWidth: '800px' },
  dayHeader: { color: 'white', padding: '15px 20px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
  dayHeaderText: { fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '10px' },
  weatherContainer: { display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '6px', padding: '8px 12px' },
  weatherIcon: { fontSize: '1.2rem', marginRight: '10px' },
  weatherTemp: { fontWeight: 'bold', marginRight: '10px' },
  weatherSummary: {},
  timeline: { position: 'relative', marginTop: '30px' },
  timelineConnector: { position: 'absolute', top: '10px', bottom: '10px', left: '88px', width: '4px', backgroundColor: '#dfe6e9', borderRadius: '2px' },
  event: { display: 'flex', alignItems: 'center', marginBottom: '25px', position: 'relative' },
  eventTimeContainer: { width: '60px', textAlign: 'right', marginRight: '15px' },
  eventTime: { fontWeight: 'bold', color: '#7f8c8d', fontSize: '1rem' },
  eventIconContainer: { width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, border: '3px solid #f4f7f6', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  eventIcon: { fontSize: '24px' },
  eventDetails: { backgroundColor: '#ffffff', padding: '15px 20px', borderRadius: '8px', flex: 1, marginLeft: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
  eventActivity: { fontWeight: 'bold', margin: '0 0 5px 0', color: '#34495e' },
  eventDescription: { margin: 0, fontSize: '0.9rem', color: '#555', lineHeight: 1.5 },
  mapContainer: { padding: '20px', backgroundColor: '#ffffff' },
  subHeader: { textAlign: 'center', color: '#2c3e50', marginBottom: '20px' },
  mapIframe: { border: '0', width: '100%', height: '450px', borderRadius: '8px' },
  modalBackdrop: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modalContent: { backgroundColor: 'white', padding: '30px', borderRadius: '8px', width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', position: 'relative' },
  closeButton: { position: 'absolute', top: '10px', right: '15px', background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', color: '#aaa' },
  geminiButton: { backgroundColor: '#6c5ce7', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold', transition: 'background-color 0.3s', ':disabled': { backgroundColor: '#a29bfe', cursor: 'not-allowed' } },
  toastButton: { backgroundColor: '#9b59b6', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '5px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold', transition: 'background-color 0.3s' },
  loader: { border: '4px solid #f3f3f3', borderTop: '4px solid #6c5ce7', borderRadius: '50%', width: '30px', height: '30px', animation: 'spin 1s linear infinite', margin: '20px auto' },
  packingListContainer: { marginTop: '20px', textAlign: 'left' },
  packingCategory: { color: '#2980b9', borderBottom: '2px solid #ecf0f1', paddingBottom: '5px', marginTop: '20px' },
  packingList: { listStyleType: '"- "', paddingLeft: '20px' },
  textarea: { width: 'calc(100% - 20px)', height: '80px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', margin: '15px 0', fontFamily: 'inherit' },
  toastResultContainer: { marginTop: '20px', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '5px', border: '1px solid #eee' },
  generatedToast: { whiteSpace: 'pre-wrap', lineHeight: 1.6 },
  copyButton: { backgroundColor: '#16a085', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }
};

// This is a workaround for the animation keyframes since inline styles don't support it directly.
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
document.head.appendChild(styleSheet);


export default App;
