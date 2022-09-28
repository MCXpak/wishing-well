let order = "ascending"

const getWishData = async () => {
    let res = await fetch("http://localhost:3000/wishes")

    const wishes = await res.json()

    return wishes
}

const displayPage = async () => {
    //Get wishes
    const wishes = await getWishData();

    console.log(wishes)

    createWishElements(wishes);

    createForms();

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
    console.log(wish.id)
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
    console.log(wish.id)
    denyDiv.appendChild(denyIcon)

    const deny = document.createElement('p')
    deny.textContent = wish.deny
    deny.setAttribute('for', `denyWish${wish.id}`)
    denyDiv.appendChild(deny)

    voteDiv.appendChild(denyDiv)

    //Append vote div to wish div
    wishDiv.appendChild(voteDiv)

    //Append wish div to container div
    const container = document.querySelector('#container')
    container.appendChild(wishDiv)
}

const createWishElements = (wishes) => {
    //Create wish div
    for(const wish of wishes){
        createWishElement(wish)
    }
}

const voteCallback = async (e, id, type) => {

    //Grab wish id
    console.log(id)
    console.log(e.target.id)
    
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
        //window.location.reload()
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

const wishDisplayOrder = async (e) => {

    console.log(e.target.id)
    const res = await fetch(`http://localhost:3000/${String(e.target.id)}`)

    const wishes = await res.json()
    console.log(wishes)
    order = e.target.id
    //window.location.reload();
    // if (res.status == 200) {
    //     //window.location.reload();
    //     console.log("Wish order updated")
    // }
}

const createForms = () => {
    const createWishForm = document.querySelector('#wish-form')
    createWishForm.addEventListener('submit', addWish)

    const ascendingRadio = document.querySelector('#ascending')
    const descendingRadio = document.querySelector('#descending')

    ascendingRadio.addEventListener('change', wishDisplayOrder)
    descendingRadio.addEventListener('change', wishDisplayOrder)
}

displayPage();









