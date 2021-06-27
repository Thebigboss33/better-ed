function sendLogin() {

    const username = document.getElementById('identifiant').value;
    const password = document.getElementById('pass').value;

    if(!username){
        document.getElementById('error').innerHTML = "Erreur : Un identifiant doit etre mis"
        return
    }

    if(!password){
        document.getElementById('error').innerHTML = "Erreur : Un mot de passe doit etre mis"
        return
    }

    login(username, password);

}

function checkSession(){

    if(window.sessionStorage.getItem('token') && window.sessionStorage.getItem('data')){

        if(JSON.parse(window.sessionStorage.getItem('data')).typeCompte == "E"){

            const id = JSON.parse(window.sessionStorage.getItem('data')).id;
            const token = window.sessionStorage.getItem('token')

            var data = 'data= {'+
            '"token": "' + token + '"}';
            
            axios.post(
                "http://api.ecoledirecte.com/v3/eleves/" + id + "/timeline.awp?verbe=get",
                data
            ).then((res) => {
                
                if (res.data.code == 200) {
                    window.location = "http://better-ecole-directe.ml/dashboard.html"
                }else{
                    window.sessionStorage.clear()
                    window.location.reload()
                }

            }).catch((e) => {
                console.log(e)
            });

        }else if(JSON.parse(window.sessionStorage.getItem('data')).typeCompte == "1"){

            const id = JSON.parse(window.sessionStorage.getItem('data')).id;
            const token = window.sessionStorage.getItem('token')

            var data = 'data= {'+
            '"token": "' + token + '"}';
            
            axios.post(
                "https://api.ecoledirecte.com/v3/1/" + id + "/timelineAccueilCommun.awp?verbe=get",
                data
            ).then((res) => {
                
                if (res.data.code == 200) {
                    window.location = "http://better-ecole-directe.ml/dashboard.html"
                }else{
                    window.sessionStorage.clear()
                    window.location.reload()
                }

            }).catch((e) => {
                console.log(e)
            });

        }else{
            window.sessionStorage.clear()
            window.location.reload()
        }

    }

}