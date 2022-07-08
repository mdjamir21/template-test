const imageContainer = document.getElementById('image-container');

const loader = document.getElementById('loader');

let photoarray = []





const count = 5;
const apikey = 'A7YgYqwlnXNOFe_1StrzHwDeao0gK_liAbrj8ELsf70';
const apiURl = `https://api.unsplash.com/photos/?client_id=${apikey}`;

console.log(apiURl)


// helper functions

function setAttributesforpics (element,attributes)
{
    for(const key in attributes)
    {
        element.setAttribute(key,attributes[key]);
    }
}



//create element for links and photos

function displayphotos()
{

    photoarray.forEach((photo) => 
    { //create<a> to link to unsplash

        const item = document.createElement('a')
        console.log("item created")
        setAttributesforpics(item,{
            href:photo.links.html,
            target:'_blank'

        });
        // item.setAttribute('href',photo.links.html);
        // item.setAttribute('target','_blank');


        const img = document.createElement('img');

        setAttributesforpics(img,
            {
                src:photo.urls.regular,
                alt:photo.alt_description,
                alt:photo.alt_description

            });

        // img.setAttribute('src',photo.urls.regular);
        // img.setAttribute('alt',photo.alt_description);
        // img.setAttribute('title',photo.alt_description);
        item.appendChild(img);
        imageContainer.appendChild(item);


    });


}



// get photos

async function getPhotos()
{

    try {
        const response = await fetch(apiURl);
        photoarray = await response.json();
        console.log(photoarray )
        displayphotos();
        console.log(photoarray.length);
        console.log(photoarray);
    } catch (error) {
        //catch  error here
    }


}

loader.hidden = true;

getPhotos();
