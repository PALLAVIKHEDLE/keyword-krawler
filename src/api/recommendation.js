async function RecommendationList(payload) {
    let final_response
    try {
      const response =  await fetch('http://34.105.100.197/api/v1/keyword-recommendations/', {
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
  export default RecommendationList;