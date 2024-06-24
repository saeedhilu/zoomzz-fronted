import React from 'react';
// Components
import Header from '../components/layout/Header';
import TopRatedRooms from '../components/rooms/TopRatedRooms';
import Banner from '../components/layout/Banner';

const HomePage = () => {
  const userLogoUrl = '';
  const websiteName = 'ZOOMZZZ';
  const bannerImage = 'https://s3-alpha-sig.figma.com/img/9473/d3b6/4fcca17a8bcf2c5825de62ce3be9affb?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fOWnwJSYACG~8nYb0FdA2Z2R0JfqxEFR-yzunfB-zSRf7AAKCjKZ82e7cYQ2rST485WNvNXa1KSWQcodohMh2l3zxjmkOivNfapFjTAloLoVlw0uM8KvWfNMurGHq8vX9LI3pHRY16E-h17CYER-308C-CZh9B-KTKPSNp~ChnZRF4nxbZEQ44Mp8mIaAV1FenWC7plpigyx6YX6t-G1DaxB7X8qc7s7xhIiNIPygB2UAON~H6CW1emDL3SRmGK~o3qw4Yja7vd8K14LwJJTvNU5ufDn6DyxthaEEprsBFIzzF7~UDjYLHOke394wnXsdnQ8xya1XO0RWwtWt200ew__';
  const title = 'Try Hosting With Us';
  const buttontext = 'Try to Host';

  const handleOnclick = () => {
    alert('Hosting button is clicked');
  };

  return (
    <div>
      <Header websiteName={websiteName} userLogoUrl={userLogoUrl} />
      <div className="container mx-auto mt-8 p-4">
        <TopRatedRooms />
        <Banner
          bannerImage={bannerImage}
          title={title}
          buttontext={buttontext}
          onclickButton={handleOnclick}
        />
      </div>
    </div>
  );
};

export default HomePage;
