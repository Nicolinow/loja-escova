function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn !== 'true') {
        window.location.href = '/pages/signin.html';
    }
}

checkLoginStatus();