var timeout = null;
const GET = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}


const generateQuery = () => {
    const search = $("#autocomplete").val();
    // const selected = $("#autocomplete").val();
    const key = "Key Goes here";
    return `https://us-autocomplete-pro.api.smarty.com/lookup?search=${search}&key=${key}`;

}

const getData = async (username) => {
    try {
        const data = await GET(generateQuery());
        console.log(data);
        // const data = await GET(`https://api.github.com/users/${username}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

const onSearch = async (event) => {
    const user = event.target.value; 
    
    // Debounce 
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(async () => {
        const data = await getData(user);
        $("#autocomplete").autocomplete({
            source: [data.login]
        });
        $("#autocomplete").autocomplete("search", user);;
    
    }, 500);

    
}