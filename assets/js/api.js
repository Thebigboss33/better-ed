function login (username, password){

    var data = 'data= {'+
    '"identifiant": "' + username + '" , "motdepasse": "' + password + '"}';
    
    axios.post(
        "https://api.ecoledirecte.com/v3/login.awp",
        data
    ).then((res) => {
        
        if (res.data.code == 200) {
            window.sessionStorage.clear();
            window.sessionStorage.setItem('token', res.data.token);
            window.sessionStorage.setItem('data', JSON.stringify(res.data.data.accounts[0]));
            window.location = "http://thebigboss33.tech/better-ed/dashboard.html"
        }else{
            document.getElementById('error').innerHTML = "Erreur : " + JSON.stringify(res.data.message).slice(1,-1)
        }

    }).catch((e) => {
        console.log(e)
    });
}

function getTimeLine(id, token) {

    var data = 'data= {'+
    '"token": "' + token + '"}';
    
    axios.post(
        "https://api.ecoledirecte.com/v3/eleves/" + id + "/timeline.awp?verbe=get",
        data
    ).then((res) => {
        
        if (res.data.code == 200) {
            console.log(res.data); 
        }

    }).catch((e) => {
        console.log(e)
    });

}
