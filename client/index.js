const getWishData = async () => {
    let res = await fetch("http://localhost:3000/wishes")

    const wishes = await res.json()

    return wishes
}

const displayWishes = async () => {
    //Get wishes
    const wishes = await getWishData();

    console.log(wishes)

    createWishElements(wishes);

}

const createWishElement = (wish) => {
    const wishDiv = document.createElement('div')
    wishDiv.className = 'wish-div'
    wishDiv.id = wish.id
    
    //Wish heading
    const headingDiv = document.createElement('div')
    headingDiv.className = "heading-div"
    const heading = document.createElement('h2')
    heading.textContent = wish.wish
    headingDiv.appendChild(heading)
    wishDiv.appendChild(headingDiv)

    //Vote stats div
    const voteDiv = document.createElement('div')
    voteDiv.className = "vote-div"

    //Grant
    const grantDiv = document.createElement('div')
    grantDiv.className = "grant-div"

    //Font Awesome Grant Icon
    const grantIcon = document.createElement('i')
    grantIcon.className = "fa-solid fa-wand-magic-sparkles"
    grantIcon.id = `grantWish${wish.id}`
    grantIcon.addEventListener('click', e => voteCallback(e, 'grant'))
    grantDiv.appendChild(grantIcon)
    
    const grant = document.createElement('p')
    grant.textContent = wish.grant
    grantDiv.appendChild(grant)

    voteDiv.appendChild(grantDiv)

    //Deny
    const denyDiv = document.createElement('div')
    denyDiv.className = "deny-div"

    //Font Awesome Deny Icon
    const denyIcon = document.createElement('i')
    denyIcon.className = "fa-solid fa-ban"
    denyIcon.id = `denyWish${wish.id}`
    denyIcon.addEventListener('click', e => voteCallback(e, 'deny'))
    denyDiv.appendChild(denyIcon)

    const deny = document.createElement('p')
    deny.textContent = wish.deny
    denyDiv.appendChild(deny)

    voteDiv.appendChild(denyDiv)

    //Append vote div to wish div
    wishDiv.appendChild(voteDiv)

    //Append wish div to container div
    const container = document.querySelector('#container')
    container.appendChild(wishDiv)
}

const createWishElements = (wishes) => {
    //Wish list for sorting
    const wishList = [];

    //Create wish div
    for(const wish of wishes){
        createWishElement(wish)
    }
}

const voteCallback = async (e, type) => {

    //Grab wish id
    const id = e.target.parentNode.parentNode.parentNode.id
    
    const data = {
        id: id,
        type: type
    }

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    const res = await fetch("http://localhost:3000/vote", options)

    if (res.status == 201){
        console.log("It worked")
        window.location.reload()
    }
}

const addWish = async (e) => {
    const wish = {id: 0, wish: e.target.wish.value , grant: 0, deny: 0}
    
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(wish)
    }

    const res = await fetch("http://localhost:3000/create", options);

    if (res.status == 201) {
        alert("Wish successfully!");
        window.location.reload();
    }
}

const form = document.querySelector('#wish-form')
form.addEventListener('submit', addWish)

displayWishes();









