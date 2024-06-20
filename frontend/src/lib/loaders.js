import axios from "axios";

export const singlePageLoaderSchool = async ({ request, params }) => {
    try {
        const res = await axios.get(`http://localhost:8800/api/posts/school/${params.id}`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
              }
        });

        return res.data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to load post data');
    }
};

export const singlePageLoaderKindergarden = async ({request, params}) => {
    const res = await axios.get("http://localhost:8800/api/posts/kindergarden/"+params.id, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
          }
    });
    

    return res.data;
}

export const singlePageLoaderChild = async ({request, params}) => {
    const res = await axios.get("http://localhost:8800/api/posts/social-child/"+params.id, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
          }
    });
    

    return res.data;
}


export const singlePageLoaderTeenager = async ({request, params}) => {
    const res = await axios.get("http://localhost:8800/api/posts/social-teenager/"+params.id, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
          }
    });
    

    return res.data;
}