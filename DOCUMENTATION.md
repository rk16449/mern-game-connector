Components
----------

**client\src\App.js**

### 1. App

This component is the main entry to the App

The entire app is wrapped with redux, which stores the state on the client side
to store things such as the logged in users data

It sets up the Navbar, the routes, the chatbot and the cookie consent component

The first time this component runs, we dispatch to the store to load the current User   




-----
**client\src\components\auth\Login.js**

### 1. Login

This component controls the Login page for the app

It is a form which submits data to the server, and if correct will redirect to the Dashboard

Usage:
```html
<Login />
```   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
login|func|yes||
isAuthenticated|bool|no||
-----
**client\src\components\auth\Register.js**

### 1. Register

This component controls the Register page

It is a form the user can fill in, which will post to the server, if successful will create a user object and return the users token

Usage:
```html
<Register />
```   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
setAlert|func|yes||
register|func|yes||
isAuthenticated|bool|no||
-----
**client\src\components\builds\BuildSaveModal.js**

### 1. BuildSaveModal

This component controls the saving and loading of the users Builds
It loads builds whenever opening and shows them on the drop down menu
It also has the ability to load and update the build page with the load button
We can also save any build data too


Usage:
```html
<BuildSaveModal />
```   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
isAuthenticated|bool|no||
saveBuild|func|yes||
loadBuilds|func|yes||
builds|object|yes||
loadBuild|func|yes||
-----
**client\src\components\builds\BuildTable.js**

### 1. BuildTable

This component controls the table of the build page, where there is a component, selected and price


Usage:
```html
<BuildTable />
```   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
builds|object|yes||
getBuilds|func|yes||
-----
**client\src\components\builds\BuildTotalCost.js**

### 1. BuildTotalCost

This component calculates all the build pages parts and returns a total

Usage:
```html
<BuildTotalCost />
```   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
builds|object|yes||
totalCost|number|yes||
-----
**client\src\components\builds\Builds.js**

### 1. Builds

This component controls the Build page, which has multiple child components

The child components it communicates with is the BuildTable, and the BuildSaveModal

Usage:
```html
<Builds />
```   




-----
**client\src\components\builds\components\ComponentItem.js**

### 1. ComponentItem

This component is a generic item for the components on the build table   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
headers_component_list|array|yes||
component|object|yes||
header|string|no||
addBuildComponent|func|yes||
-----
**client\src\components\builds\components\ComponentPage.js**

### 1. ComponentPage

This component is a generic page for the components on the build page   




-----
**client\src\components\builds\components\ComponentTable.js**

### 1. ComponentTable

This component is a generic table for the components on the build page   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
prop|custom|no||
headers|array|yes||
products|array|yes||
-----
**client\src\components\cart\Cart.js**

### 1. Cart

This component controls the shopping cart items that have been added


Usage:
```html
<Cart />
```   




-----
**client\src\components\cart\Item.js**

### 1. Item

This component controls the individual items in the shopping cart


Usage:
```html
<Cart>
 // For each item in the cart.. render with Item
 {cart.map((item) => {
              return <Item key={item.product.id} item={item} />;
    })}
</Cart>
```   




-----
**client\src\components\chatbot\Chatbot.js**

### 1. Chatbot

This component uses Kommunicate to handle the front-end of my chatbot, it is connected to my DialogFlow private key externally on the Kommunicate site.

Usage:
```html
<Chatbot />
```   




-----
**client\src\components\dashboard\Dashboard.js**

### 1. Dashboard

This component controls the Dashboard page which edits the users Profile.

The profile object is retrieved from the redux state, after we call getCurrentProfile()
when this component loads to populate it. We then pass any profile data into the
dashboards child states.

Usage:
```html
<Dashboard />
```   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
getCurrentProfile|func|yes||
auth|object|yes||
profile|object|yes||
deleteAccount|func|yes||
-----
**client\src\components\dashboard\DashboardOptions.js**

### 1. DashboardOptions

This component controls the options on the dashboard, no data required to be passed in
This component has links to either edit the profile or add a favourite game

Usage:
```html
<Dashboard>
 <DashboardOptions />
</Dashboard>
```   




-----
**client\src\components\dashboard\Games.js**

### 1. Games

This component controls the Games that the user has added to their favourited games
There is also the option to delete the favourite games off their list
Usage:
```html
<Games games={profile.games}></Games>
```   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
games|array|yes||
deleteGame|func|yes||
-----
**client\src\components\layout\Landing.js**

### 1. Landing

This component controls the Landing page of my website

It checks whether or not the user is logged in, and depending on it, displays the buttons to either sign up or login
Otherwise it is a blank page with a background.

Usage:
```html
<Landing/>
```   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
isAuthenticated|bool|no||
-----
**client\src\components\layout\Navbar.js**

### 1. Navbar

This component controls the Navigational Bar located on the top of my website

It checks whether or not the user is logged in or not, depending on it, render a different navbar
Todo this it pulls the auth object from the redux state, and checked if we are authenticated,
if we are then show logout otherwise login

The navbar also updates the car link with the amount stored in the cart.

Usage:
```html
<Navbar/>
```   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
logout|func|yes||
auth|object|yes||
-----
**client\src\components\layout\NotFound.js**

### 1. NotFound

This component controls any pages or routes on my website that do not exist, instead of sending the user to a blank page, show them this.   




-----
**client\src\components\layout\Spinner.js**

### 1. Spinner

This component shows the Loading state of my website, it is purely a GIF to show the user while things such as redux state are loading in the background.

Usage:
```html
loading ? <Spinner/> : ( Show the rest of the page here )
```   




-----
**client\src\components\post\CommentForm.js**

### 1. CommentForm

This component handles the comment form for posting comments in the Forums page   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
addComment|func|yes||
-----
**client\src\components\post\CommentItem.js**

### 1. CommentItem

This component handles each comment within the forums   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
postId|number|yes||
comment|object|yes||
auth|object|yes||
deleteComment|func|yes||
-----
**client\src\components\post\Post.js**

### 1. Post

This component handles the individual post pages   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
getPost|func|yes||
post|object|yes||
-----
**client\src\components\posts\PostForm.js**

### 1. PostForm

This component is a form to post a forum post   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
addPost|func|yes||
-----
**client\src\components\posts\PostItem.js**

### 1. PostItem

This component handles each of the post items in the forum   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
post|object|yes||
auth|object|yes||
addLike|func|yes||
unLike|func|yes||
deletePost|func|yes||
showActions||no|true|
-----
**client\src\components\posts\Posts.js**

### 1. Posts

This component handles the display of the Forums page shows the current posts and to post a new one   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
getPosts|func|yes||
post|object|yes||
-----
**client\src\components\product\Product.js**

### 1. Product

This component handles the view of the Product in the shop   




-----
**client\src\components\product\ProductList.js**

### 1. ProductList

This component handles the list of products in the shop   




-----
**client\src\components\profile\Profile.js**

### 1. Profile

This component controls the users profile page   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
getProfileById|func|yes||
profile|object|yes||
auth|object|yes||
-----
**client\src\components\profile\ProfileAbout.js**

### 1. ProfileAbout

This component controls the about section on the users page   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
profile|object|yes||
-----
**client\src\components\profile\ProfileGames.js**

### 1. ProfileGames

This component controls the games in the users page   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
game|array|yes||
-----
**client\src\components\profile\ProfileTop.js**

### 1. ProfileTop

This component controls the top part of the users page   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
profile|object|yes||
-----
**client\src\components\profile-forms\AddGames.js**

### 1. AddGames




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
addGame|func|yes||
-----
**client\src\components\profile-forms\CreateProfile.js**

### 1. CreateProfile




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
createProfile|func|yes||
-----
**client\src\components\profile-forms\EditProfile.js**

### 1. EditProfile




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
createProfile|func|yes||
getCurrentProfile|func|yes||
profile|object|yes||
-----
**client\src\components\routing\PrivateRoute.js**

### 1. PrivateRoute

This component handles the private routes, which means the user has to be logged in to view them,
if they are not then we redirect them to the login page   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
auth|object|yes||
-----
**client\src\components\routing\Routes.js**

### 1. Routes

This component handles all the routes you can visit in my website for example /my-cart goes to the cart component page   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
getCpus|func|yes||
getCpuCoolers|func|yes||
-----
**client\src\components\shop\Shop.js**

### 1. Shop

This component is no longer used   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
prop|custom|no||
-----
**client\src\components\steam\GameDetailComponents\GamePicture.js**

### 1. GamePicture

This component controls the game picture in the game page   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
data|object|yes||
-----
**client\src\components\steam\GameDetailComponents\PCRequirements.js**

### 1. PCRequirements

This component displays the minimum and recommended requirements of the PC game passed into it   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
data|object|yes||
-----
**client\src\components\steam\GameMainImage.js**

### 1. GameMainImage

This component handles the top game image in the games page   




-----
**client\src\components\steam\Games.js**

### 1. Steam

This component handles the Games page, which displays a top background and a couple of games which can go to their individual game page   




-----
**client\src\components\steam\GamesDetail.js**

### 1. Games

This component controls the individual Games clicked on in the Games page

Usage:
```html
<PCRequirements data={game}></PCRequirements>
```   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
getGameByAppId|func|yes||
game|object|yes||
-----
**client\src\components\users\UserItem.js**

### 1. UserItem

This component handles the view for each user on the user page   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
profile|object|yes||
-----
**client\src\components\users\Users.js**

### 1. Users

This component handles the Gamers page which shows the list of users, and a button to view them in more detail for each user   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
getProfiles|func|yes||
profile|object|yes||
-----

<sub>This document was generated by the <a href="https://github.com/marborkowski/react-doc-generator" target="_blank">**React DOC Generator v1.2.5**</a>.</sub>
