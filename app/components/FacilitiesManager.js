import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
async function removeFavorite(docId , collectionId) {
  try {
      await firestore().collection('userFavouriteLocations').doc(auth().currentUser.uid).collection(collectionId).doc(docId).delete().then(()=>{alert("Removed from favorites")})
} catch (e) {
 alert(e.message);
}
}

function goDetails(props , page , data)
{
  marker = {
    geometry:{coordinates:[data.longitude,data.latitude]},
    properties:{Name:data.id,description:data.description , ADDRESSSTREETNAME:data.ADDRESSSTREETNAME , ADDRESSPOSTALCODE:data.ADDRESSPOSTALCODE }
};
props.navigation.navigate(page , marker);
}

async function addFavourite(collectionId,Name,longitude , latitude, description , ADDRESSSTREETNAME , ADDRESSPOSTALCODE) {
    try {
       await firestore().collection('userFavouriteLocations').doc(auth().currentUser.uid).collection(collectionId).doc(Name).set({
        longitude: longitude,
        latitude: latitude,
        description: description,
        ADDRESSSTREETNAME:ADDRESSSTREETNAME,
        ADDRESSPOSTALCODE:ADDRESSPOSTALCODE

      });
      alert("Location Saved");
  } catch (e) {
   alert(e.message);
  }
  }

export {
    removeFavorite,
    goDetails,
    addFavourite
                          
};