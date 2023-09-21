window.onload = function () {

    //  document.getElementById('login').onclick = login;
  
 
   

    fetchAllFollowers();
  
  
    
    document.getElementById('userInfo-username').textContent ='Hello '+ sessionStorage.getItem('username')+ '!!!';

    document.getElementById('btn-home').addEventListener('click', function() {
      window.location.href = '/client/homepage2.html';
    });
        
    const availableTags = [
      'Apple',
      'Banana',
      'Cherry',
      'Date',
      'Fig',
      'Grape',
      'Lemon',
      'Mango',
      'Orange',
      'Pear'
    ];

    // Initialize autocomplete
    // $('#searchInput').autocomplete({
    //   source: availableTags, // Data for autocomplete
    //   minLength: 2, // Minimum characters required before triggering autocomplete
    //   select: function(event, ui) {
    //     // Handle selection
    //     $('#results').text('Selected: ' + ui.item.value);
    //   }
    // });
  }


const searchInput = document.getElementById('searchInput');
const suggestionsDiv = document.getElementById('suggestions');

function fetchUsers(query) {
  return fetch(`https://jsonplaceholder.typicode.com/users?q=${query}`)
    .then(response => response.json())
    .then(data => data.map(user => user.name));
}

$(document).ready(function() {
  searchInput.addEventListener('input', async () => {
    const query = searchInput.value;

    if (query.length >= 2) {
      try {
        const suggestions = await fetchUsers(query);

        // Display autocomplete suggestions
        $(searchInput).autocomplete({
          source: suggestions,
          minLength: 2,
          select: function(event, ui) {
            searchInput.value = ui.item.value;
            suggestionsDiv.innerHTML = ''; // Clear suggestions
          }
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      suggestionsDiv.innerHTML = ''; // Clear suggestions
    }
  });
});

   
  
  
  async function fetchAllFollowers() {
      const response = await fetch(`http://localhost:3000/userFollowers/${sessionStorage.getItem('userId')}`, {
          headers: {
              'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
          }
      });
      const products = await response.json();
      console.log(products)
  
      let html = ``;
      
  
      products.Followers.forEach(prod => {
  
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
                  ${prod.username}
                  
                    <span class="post__headerSpecial"><span class="material-icons post__badge"> verified  <input type="hidden" name="hiddenField" value="${prod._id}" />  <button id="btn_unfollow" onclick="Unfollow(this)" class="tweetBox__followButton hover-button">Unfollow</button></span>
                     <p> @${prod.username} </p>
                     </span>
                  </h3>
                  </div>
                 
                </div>
                
               
              </div>
            </div>
              `
      
  
         
              
      });
      
      document.getElementById('tweets').innerHTML = html;
  }

  async function findParentWithClass(element, className) {
    while (element) {
        if (element.classList.contains(className)) {
            return element;
        }
        element = element.parentElement;
    }
    return null; // If no parent with the specified class is found
}

  async function Unfollow(button) {
    var unfollowUserId = button.previousElementSibling;
   
  
   
      const response = await fetch('http://localhost:3000/userFollowers/unfollow', {
          method: 'POST',
          body: JSON.stringify({
              
               UserID: sessionStorage.getItem('userId'),
               Followers: unfollowUserId.value          
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
       
        var parentElement = await findParentWithClass(button, 'post');
         parentElement.remove();
      }


  

}
  
  
  
  
  
  