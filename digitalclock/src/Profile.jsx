

  const user = {
    name: 'Gugan',
    imageUrl: 'https://premium.vgc.no/v2/images/0034471f-fdd6-46a0-8d76-31839bae812e?fit=crop&format=auto&h=2745&w=1960&s=9039ce26fe7d25d8686a3dfdd3fd5dcb203302ee',
    imageSize: 80,
  };


  function Profile() {
    return (
      <>
        <h1>{user.name}</h1>
        <img
          className="avatar"
          src={user.imageUrl}
          alt={'Photo of ' + user.name}
          style={{
            width: user.imageSize,
            height: user.imageSize,
          }}
        />
      </>
    );
  }

  export default Profile