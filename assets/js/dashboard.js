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
                
                    const account = JSON.parse(window.sessionStorage.getItem('data'));

                    const photoUrl = "https://" + account.profile.photo.substring(2);

                    document.getElementById('title').innerHTML = document.getElementById('title').innerHTML + account.prenom.charAt(0) + account.prenom.substring(1).toLowerCase() + " " + account.nom.charAt(0) + account.nom.substring(1).toLowerCase()
                    document.getElementById('pdp').src = photoUrl;


                }else{
                    window.sessionStorage.clear()
                    window.location = "http://better-ecole-directe.ml/login.html"
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
                
                    const account = JSON.parse(window.sessionStorage.getItem('data'));

                    document.getElementById('title').innerHTML = document.getElementById('title').innerHTML + account.prenom.charAt(0) + account.prenom.substring(1).toLowerCase() + " " + account.nom.charAt(0) + account.nom.substring(1).toLowerCase()


                }else{
                    window.sessionStorage.clear()
                    window.location = "http://better-ecole-directe.ml/login.html"
                }

            }).catch((e) => {
                console.log(e)
            });

        }else{
            window.sessionStorage.clear()
            window.location = "http://better-ecole-directe.ml/login.html"
        }

    }else{
        window.sessionStorage.clear()
        window.location = "http://better-ecole-directe.ml/login.html"
    }

}