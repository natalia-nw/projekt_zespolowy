const HttpHeader =  {
    'Content-Type': 'application/json',
    'Authorization': `Token ${sessionStorage.getItem('Token')}`
};

export default HttpHeader;