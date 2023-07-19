import { Component } from "react";
import { Carousel, initTE } from "tw-elements";
import AuthenticationService from "../user/AuthenticationService";
import 'tw-elements';

initTE({ Carousel });

class home extends Component {

  render() {
    const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
    const loggedUserRole = AuthenticationService.loggedUserRole();
    // const loggedUser = AuthenticationService.loggedUserName();
    let loggedAsEManager = false;
    let loggedAsCManager = false;
    let loggedAsEditor = false;
    let unknownUser = false;

    if (isUserLoggedIn === true) {
      console.log("User Logged In")
    } else {
      unknownUser = true;
    }

    if (loggedUserRole != null && loggedUserRole === 'Employee Manager') {
      loggedAsEManager = true;
    }
    if (loggedUserRole != null && loggedUserRole === 'Customer Manager') {
      loggedAsCManager = true;
    }
    if (loggedUserRole != null && loggedUserRole === 'editor') {
      loggedAsEditor = true;
    }

    return (
      <div>
        {/* {isUserLoggedIn && */}
          <div class="">
            <section class="">
              <div class="text-center bg-white text-gray-800 py-20 px-6">
                <h1 class="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight uppercase mb-8 drop-shadow-md ">delicious and freshly<br />
                  <span class="text-orange-600 ">baked </span>
                  <span class="text-orange-500 animate-pulse "> PizzaMania </span>
                </h1>
              </div>
            </section>
            <div class="mb-24 container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
              <div class="-m-1 flex flex-wrap md:-m-2">
                <div class="flex w-1/3 flex-wrap">
                  <div class="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      class="block h-full w-full rounded-lg object-cover object-center"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8zJX9p57ngDAHaUwD8Hs_1PXoRe3k0KVsmQ&usqp=CAU"
                    />
                  </div>
                </div>
                <div class="flex w-1/3 flex-wrap">
                  <div class="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      class="block h-full w-full rounded-lg object-cover object-center"
                      src="https://img.freepik.com/free-photo/mixed-pizza-with-various-ingridients_140725-3790.jpg?w=2000"
                    />
                  </div>
                </div>
                <div class="flex w-1/3 flex-wrap">
                  <div class="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      class="block h-full w-full rounded-lg object-cover object-center"
                      src="https://www.kingarthurbaking.com/sites/default/files/2022-03/Easiest-Pizza_22-2_11.jpg" />
                  </div>
                </div>
                <div class="flex w-1/3 flex-wrap">
                  <div class="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      class="block h-full w-full rounded-lg object-cover object-center"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-4Lb7iNiT2WSAqvGHO3NowsQGRCrMVcGEUQ&usqp=CAU"
                    />
                  </div>
                </div>
                <div class="flex w-1/3 flex-wrap">
                  <div class="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      class="block h-full w-full rounded-lg object-cover object-center"
                      src="https://static.toiimg.com/thumb/msid-87930581,imgsize-211826,width-800,height-600,resizemode-75/87930581.jpg" />
                  </div>
                </div>
                <div class="flex w-1/3 flex-wrap">
                  <div class="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      class="block h-full w-full rounded-lg object-cover object-center"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTITXxQQ4cSLkQUGaG-qaxSq1ioDHTtwFYmWA&usqp=CAU" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/* } */}
      </div>
    );
  }
}

export default home;