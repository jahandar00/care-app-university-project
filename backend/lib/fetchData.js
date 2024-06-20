import axios from "axios";
import prisma from "./prisma.js";

async function fetchSchool() {
    try {
        const response = await axios.get('https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Schulen_OpenData/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson');
        const data = response.data.features;

        for (const item of data) {
            await prisma.post.create({
                data: {
                    typeOf: "school",
                    title: item.properties.BEZEICHNUNG,
                    type: item.properties.ART,
                    description: item.properties.BEZEICHNUNGZUSATZ,
                    email: item.properties.EMAIL,
                    phoneNumber: item.properties.TELEFON,
                    website: item.properties.WWW,
                    language: item.properties.SPRACHEN,
                    street: item.properties.STRASSE,
                    plz: item.properties.PLZ,
                    coordinate: item.geometry.coordinates
                },
            });
        }

        console.log('Data successfully saved to database.');
    } catch (error) {
        console.error('Error fetching or saving data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

async function fetchKindergarden() {
    try {
        const response = await axios.get('https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Kindertageseinrichtungen_Sicht/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson');
        const data = response.data.features;


        for (const item of data) {
            await prisma.post.create({
                data: {
                    typeOf: "kindergarden",
                    title: item.properties.BEZEICHNUNG,
                    type: item.properties.ART,
                    sponsor: item.properties.TRAEGER,
                    email: item.properties.EMAIL,
                    phoneNumber: item.properties.TELEFON,
                    website: item.properties.URL,
                    street: item.properties.STRASSE,
                    streetNo: item.properties.HAUSBEZ,
                    plz: item.properties.PLZ,
                    coordinate: item.geometry.coordinates
                },
            });
        }

        console.log('Data successfully saved to database.');
    } catch (error) {
        console.error('Error fetching or saving data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

async function fetchSocialChild() {
    try {
        const response = await axios.get('https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Schulsozialarbeit_FL_1/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson');
        const data = response.data.features;


        for (const item of data) {
            await prisma.post.create({
                data: {
                    typeOf: "child",
                    title: item.properties.BEZEICHNUNG,
                    type: item.properties.LEISTUNGEN,
                    sponsor: item.properties.TRAEGER,
                    email: item.properties.EMAIL,
                    phoneNumber: item.properties.TELEFON,
                    street: item.properties.STRASSE,
                    plz: item.properties.PLZ,
                    coordinate: item.geometry.coordinates
                },
            });
        }

        console.log('Data successfully saved to database.');
    } catch (error) {
        console.error('Error fetching or saving data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

async function fetchSocialTeenager() {
    try {
        const response = await axios.get('https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Jugendberufshilfen_FL_1/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson');
        const data = response.data.features;

        for (const item of data) {
            await prisma.post.create({
                data: {
                    typeOf: "teenager",
                    title: item.properties.BEZEICHNUNG,
                    type: item.properties.LEISTUNGEN,
                    description: item.properties.KURZBEZEICHNUNG,
                    sponsor: item.properties.TRAEGER,
                    email: item.properties.EMAIL,
                    phoneNumber: item.properties.TELEFON,
                    street: item.properties.STRASSE,
                    plz: item.properties.PLZ,
                    coordinate: item.geometry.coordinates
                },
            });
        }

        console.log('Data successfully saved to database.');
    } catch (error) {
        console.error('Error fetching or saving data:', error);
    } finally {
        await prisma.$disconnect();
    }
}


export const fetchData = async () => {
    try {
        await prisma.post.deleteMany({});
        await fetchSchool();
        await fetchKindergarden();
        await fetchSocialChild();
        await fetchSocialTeenager();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};