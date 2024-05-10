function showQuestion() {
    // שמור את הכפתור שנלחץ כדי שנוכל לשנות את הצבע שלו מאוחר יותר
    window.clickedButton = document.getElementById('byeButton');

    // העבר את המשתמש לדף השאלה
    window.location.href = 'chack.html';
}
function handleResponse(response) {
    if (response) {
        // אם המשתמש בחר "כן", שנה את צבע הכפתור ל-אדום וחזור לדף הקודם
        window.clickedButton.style.backgroundColor = 'red';
        history.back();
    } else {
        // אם המשתמש בחר "לא", עשה משהו אחר או חזור לדף הקודם
        history.back();
    }
}