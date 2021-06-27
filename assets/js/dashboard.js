function checkSession(){

    if(window.sessionStorage.getItem('token') && window.sessionStorage.getItem('data')){

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
                const photoUrl2 = account.profile.photo

                document.getElementById('title').innerHTML = document.getElementById('title').innerHTML + account.prenom.charAt(0) + account.prenom.substring(1).toLowerCase() + " " + account.nom.charAt(0) + account.nom.substring(1).toLowerCase()
                document.getElementById('pdp').src = photoUrl;

                axios.get(photoUrl, {
                    headers: {
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36'
                    }
                });

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

}
