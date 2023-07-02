const saveTokenToCookie = (user, code, response) => {
    const userJwtToken = user.generateJwtToken();
    console.log('userJwtToken:', userJwtToken);

    const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),  // 90 days from now
        httpOnly: true,
        Secure: true,
    };

    console.log('expiredDate:', options.expires);
    response.status(code)
            .cookie("userToken", userJwtToken, options)
            .json({
                success: `Login success! Welcome back ${user.name} :)`, 
                user: user, 
                userToken: userJwtToken
            });
}

module.exports = saveTokenToCookie;