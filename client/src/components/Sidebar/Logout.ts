const logout = () => {
    localStorage.removeItem('authorizationToken');
    window.location.reload();
}

export default logout;