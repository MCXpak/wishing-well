const getWishData = async () => {
    let res = await fetch("http://localhost:3000/wishes")

    const data = await res.json()
    order = data.order
    console.log(order)

    console.log(data.wishes)

    return data.wishes
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
    grantIcon.addEventListener('click', e => voteCallback(e, wish.id, 'grant'))
    grantDiv.appendChild(grantIcon)
    
    const grant = document.createElement('p')
    grant.textContent = wish.grant
    grant.setAttribute('for', `grantWish${wish.id}`) 
    grantDiv.appendChild(grant)

    voteDiv.appendChild(grantDiv)

    //Deny
    const denyDiv = document.createElement('div')
    denyDiv.className = "deny-div"

    //Font Awesome Deny Icon
    const denyIcon = document.createElement('i')
    denyIcon.className = "fa-solid fa-ban"
    denyIcon.id = `denyWish${wish.id}`
    denyIcon.addEventListener('click', e => voteCallback(e ,wish.id, 'deny'))

    const func = () => {
        
    }
    denyDiv.appendChild(denyIcon)

    const deny = document.createElement('p')
    deny.textContent = wish.deny
    deny.setAttribute('for', `denyWish${wish.id}`)
    denyDiv.appendChild(deny)

    voteDiv.appendChild(denyDiv)

    //Append vote div to wish div
    wishDiv.appendChild(voteDiv)
    console.log(wishDiv)

    //Append wish div to container div
    const container = document.querySelector('#container')
    container.appendChild(wishDiv)
}

const createWishElements = (wishes) => {
    //Create wish div
    for(const wish of wishes){
        console.log(wish)
        createWishElement(wish)
    }
}

const voteCallback = async (e, id, type) => {

    //Grab wish id
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

const top10WishData = async () => {
    const wishes = await getWishData();
    return top10Wishes = wishes.slice(0,10)   
}

const displayPage = async () => {

    const top10wishes = await top10WishData();

    createWishElements(top10wishes);

}

displayPage();
