


    const allPlayer = () => {
        const searchInput = document.getElementById('player-search').value;
        let url=`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=A`
        fetch(url)
        .then(res=>res.json())
        .then(data =>{
            myGroup(data.player)
    
        });
    };
    
    const myGroup = (players) => {
        // console.log(players)
    
        const playerContainer= document.getElementById("player-container");
        let i=0;
        for(const player of players)
            {
                const div=document.createElement("div")
                div.classList.add("card");
                div.innerHTML=`
                <img class="card-img" src="${player.strThumb}" alt=""/>
                <h4>${player.strPlayer}</h4>
                <h4>${player.strNationality}</h4>
                <h4>${player.strTeam}</h4>
                <h4>${player.strWage}</h4>



                <!-- Button trigger modal -->
                <button type="button" onclick="singlePlayer(${player.idPlayer})" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Details
                </button>

                <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Player Detail</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <h5 id="details-bar"></h5>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
                <script type="text/javascript">
                    $('#exampleModal').modal('hide');
                </script>
                <button class="add-to-group" type="button" onclick ="handleAddToCart(${player.idPlayer})" >Add To Group</button>
                <div class="d-flex gap-4 justify-content-center">
                    <a href="https://youtube.com" target="_blank" ><i class="fa-brands fa-youtube"></i></a>
                    <a href="https://facebook.com" target="_blank"><i class="fa-brands fa-facebook"></i></a>
                </div>

                `;
    
                playerContainer.appendChild(div);
                if(i==9) break;
                i++;
            }
    };
    
    const handleAddToCart = (idPlayer) => {
        const cartCount = document.getElementById("count").innerText;
        let convertedCount = parseInt(cartCount);
        if(convertedCount>=11)
            {
                const countStop = document.getElementById("count-stop");
                div=document.createElement("div");
                div.classList.add("count-info");
                div.innerHTML=`
                <div class="alert">
                <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
                You can't add more.
                </div>
                `
                countStop.textContent = '';
                countStop.appendChild(div);
            }
        convertedCount += 1;
        if(convertedCount<=11){
            document.getElementById("count").innerText = convertedCount 
            // console.log(convertedCount)
        } 
        
        fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${idPlayer}`)
                .then(res=>res.json())
                .then(data => {
                    test(data.players[0])
                })
        
        const test = (player) => {
            // console.log(player)
            const cartContainer=document.getElementById("cart-container")
            div=document.createElement("div")
            div.classList.add("cart-info");
            div.innerHTML=`
                <h5>${player.strPlayer}</h5>
            `;
            if(convertedCount<=11)
                {
                    cartContainer.appendChild(div)
                }
        }
    
        
    }
    
    const singlePlayer = (idPlayer) => {
        fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${idPlayer}`)
                .then(res=>res.json())
                .then(data => {
                    console.log(data.players[0])
                    modal(data.players[0])
                })
        
        modal = (player) => {
            let detail= document.getElementById("details-bar");
            div=document.createElement("div")
            div.classList.add("details-info");
            div.innerHTML=`
                <img class="card-img" src="${player.strThumb}" alt=""/>
                <h6>${player.strPlayer}</h6>
                <h6>${player.strNationality}</h6>
                <h6>${player.strTeam}</h6>
                <h6>${player.strWage}</h6>
                <h6>${player.strDescriptionEN.slice(0,10)}</h6>
            `
            detail.textContent = '';
            detail.appendChild(div);
            
        }
        
    };

    allPlayer()


