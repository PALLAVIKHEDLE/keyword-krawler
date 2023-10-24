async function keywordList(payload) {
    let final_response
    try {
      const response =  await fetch('http://localhost:8000/api/v1/keyword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      .then((response) => {
        if (response.status==200) {
          return response.json();
        }
      })
      .then(data => {
        console.log('API response:', data);
        final_response = data
        return data
      })
      return final_response;
    } catch (error) {
      console.error("Error fetching scraper text:", error);
      return [];
    }
  }
  export default keywordList;