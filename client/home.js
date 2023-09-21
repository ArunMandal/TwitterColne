window.onload = function () {

  //  document.getElementById('login').onclick = login;

  fetchTweets();
  document.getElementById('submit').onclick = addTweets;

  document.getElementById('user-info-page').addEventListener('click', function() {
    window.location.href = '/client/userinfo.html';
  });




}

async function fetchTweets() {
    const response = await fetch(`http://localhost:3000/userTweet/Tweets/${sessionStorage.getItem('userId')}`, {
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
        }
    });
    const products = await response.json();
    console.log(products)

    let html = ``;
    

    products.forEach(prod => {

       console.log(prod);

        
            
           // console.log(x.Tweet)


            html += ` <div class="post">
            <div class="post__avatar">
              <img
                src="https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png"
                alt=""
              />
            </div>
    
            <div class="post__body">
              <div class="post__header">
                <div class="post__headerText">
                  <h3>
                    ${prod.UserName.username}
                    <span class="post__headerSpecial"
                      ><span class="material-icons post__badge"> verified </span>@ ${prod.UserName.username}</span
                    >
                  </h3>
                </div>
                <div class="post__headerDescription">
                  <p>   ${prod.Tweet}.</p>
                </div>
              </div>
              <img
                src="https://www.focus2move.com/wp-content/uploads/2020/01/Tesla-Roadster-2020-1024-03.jpg"
                alt=""
              />
              <div class="post__footer">
                <span class="material-icons"> repeat </span>
                <span class="material-icons"> favorite_border </span>
                <span class="material-icons"> publish </span>
              </div>
            </div>
          </div>
            `
    

       
            
    });
    
    document.getElementById('tweets').innerHTML = html;
}




async function addTweets(evt) {
 
  evt.preventDefault();
  let html = ``;
  if (document.getElementById('tbxTweet').value.length < 1) {
      alert('Cannot post empty tweet');
  } else {

      const response = await fetch('http://localhost:3000/userTweet/addUserTweet', {
          method: 'POST',
          body: JSON.stringify({
              Tweet: document.getElementById('tbxTweet').value,
              UserName: sessionStorage.getItem('userId')           
          }),
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
          }
      });
      const twt = await response.json();
      console.log(twt);

      if (response.status === 403) {
          document.getElementById('error').innerText = prod.error;
      } else {
        html += ` <div class="post">
        <div class="post__avatar">
          <img
            src="https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png"
            alt=""
          />
        </div>

        <div class="post__body">
          <div class="post__header">
            <div class="post__headerText">
              <h3>
              ${twt.UserName.username} 
                <span class="post__headerSpecial"
                  ><span class="material-icons post__badge"> verified </span>@ ${twt.UserName.username}</span
                >
              </h3>
            </div>
            <div class="post__headerDescription">
            ${twt.Tweet} 
            </div>
          </div>
          <img
            src="https://www.focus2move.com/wp-content/uploads/2020/01/Tesla-Roadster-2020-1024-03.jpg"
            alt=""
          />
          <div class="post__footer">
            <span class="material-icons"> repeat </span>
            <span class="material-icons"> favorite_border </span>
            <span class="material-icons"> publish </span>
          </div>
        </div>
      </div>
        `

        

        document.getElementById('tweets').innerHTML  =html+document.getElementById('tweets').innerHTML ;
          document.getElementById('tbxTweet').value='';
          html='';
      }


  }

  }
