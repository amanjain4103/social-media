import React from 'react';
import "./MyPostList.css";

const MyPostList = (props) => {

    return (
        <div className="mypostlist">

            {
              props.postsToBeShown.map((item) => {
                return (
                  <div className="mypostlist__post" key={item}>
                    <img 
                      alt="my post"
                      src={item}
                    />
                  </div>
                )
              })
            }

            {/* <div className="mypostlist__post">
                <img 
                  alt="my post"
                  src="https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"
                />
            </div>

            <div className="mypostlist__post">
                <img 
                  alt="my post"
                  src="https://instagram.fjdh1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/95205316_245179196540438_1810417303259447296_n.jpg?_nc_ht=instagram.fjdh1-1.fna.fbcdn.net&_nc_ohc=HBXNFvtAPKYAX8gyFWn&oh=1e572e8194718147d9f85c3d29ae7bef&oe=5FA692E2"
                />
            </div>

            <div className="mypostlist__post">
                <img 
                  alt="my post"
                  src="https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"
                />
            </div>

            <div className="mypostlist__post">
                <img 
                  alt="my post"
                  src="https://instagram.fjdh1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/95205316_245179196540438_1810417303259447296_n.jpg?_nc_ht=instagram.fjdh1-1.fna.fbcdn.net&_nc_ohc=HBXNFvtAPKYAX8gyFWn&oh=1e572e8194718147d9f85c3d29ae7bef&oe=5FA692E2"
                />
            </div>

            <div className="mypostlist__post">
                <img 
                  alt="my post"
                  src="https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"
                />
            </div>

            <div className="mypostlist__post">
                <img 
                  alt="my post"
                  src="https://instagram.fjdh1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/95205316_245179196540438_1810417303259447296_n.jpg?_nc_ht=instagram.fjdh1-1.fna.fbcdn.net&_nc_ohc=HBXNFvtAPKYAX8gyFWn&oh=1e572e8194718147d9f85c3d29ae7bef&oe=5FA692E2"
                />
            </div>

            <div className="mypostlist__post">
                <img 
                  alt="my post"
                  src="https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"
                />
            </div>

            <div className="mypostlist__post">
                <img 
                  alt="my post"
                  src="https://instagram.fjdh1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/95205316_245179196540438_1810417303259447296_n.jpg?_nc_ht=instagram.fjdh1-1.fna.fbcdn.net&_nc_ohc=HBXNFvtAPKYAX8gyFWn&oh=1e572e8194718147d9f85c3d29ae7bef&oe=5FA692E2"
                />
            </div>

            <div className="mypostlist__post">
                <img 
                  alt="my post"
                  src="https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"
                />
            </div>

            <div className="mypostlist__post">
                <img 
                  alt="my post"
                  src="https://instagram.fjdh1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/95205316_245179196540438_1810417303259447296_n.jpg?_nc_ht=instagram.fjdh1-1.fna.fbcdn.net&_nc_ohc=HBXNFvtAPKYAX8gyFWn&oh=1e572e8194718147d9f85c3d29ae7bef&oe=5FA692E2"
                />
            </div>

            <div className="mypostlist__post">
                <img 
                  alt="my post"
                  src="https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"
                />
            </div>

            <div className="mypostlist__post">
                <img 
                  alt="my post"
                  src="https://instagram.fjdh1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/95205316_245179196540438_1810417303259447296_n.jpg?_nc_ht=instagram.fjdh1-1.fna.fbcdn.net&_nc_ohc=HBXNFvtAPKYAX8gyFWn&oh=1e572e8194718147d9f85c3d29ae7bef&oe=5FA692E2"
                />
            </div> */}
        </div>
    )
}

export default MyPostList;
