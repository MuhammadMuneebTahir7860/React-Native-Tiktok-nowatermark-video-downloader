import { useState } from 'react';
import axios from 'axios';
import {
    Text,
    View,
    Image,
    StyleSheet,
    Platform,
    TouchableOpacity,
    PermissionsAndroid,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export default function UseHomePage() {
    const [play, setPlay] = useState(false);
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [videoLink, setVideoLink] = useState('');
    const postLink = async () => {
        try {
            setLoading(true);
            const res = await axios.post('http://192.168.0.17:5000/video/videoDownloader', { url: url });
            // console.log(res.data);
            setVideoLink(await res.data.nowm + '.mp4')
            console.log(videoLink);
        }
        catch (err) {

        }
        finally {
            setLoading(false);
        }
    }
    const fileUrl = videoLink;

    const checkPermission = async () => {

        // Function to check the platform
        // If Platform is Android then check for permissions.

        if (Platform.OS === 'ios') {
            downloadFile();
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission Required',
                        message:
                            'Application needs access to your storage to download File',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    // Start downloading
                    downloadFile();
                    console.log('Storage Permission Granted.');
                } else {
                    // If permission denied then show alert
                    Alert.alert('Error', 'Storage Permission Not Granted');
                }
            } catch (err) {
                // To handle permission related exception
                console.log("++++" + err);
            }
        }
    };

    const downloadFile = () => {

        // Get today's date to add the time suffix in filename
        let date = new Date();
        // File URL which we want to download
        let FILE_URL = fileUrl;
        // Function to get extention of the file url
        let file_ext = getFileExtention(FILE_URL);

        file_ext = '.' + file_ext[0];

        // config: To get response by passing the downloading related options
        // fs: Root directory path to download
        const { config, fs } = RNFetchBlob;
        let RootDir = fs.dirs.PictureDir;
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                path:
                    RootDir +
                    '/file_' +
                    Math.floor(date.getTime() + date.getSeconds() / 2) +
                    file_ext,
                description: 'downloading file...',
                notification: true,
                // useDownloadManager works with Android only
                useDownloadManager: true,
            },
        };
        config(options)
            .fetch('GET', FILE_URL)
            .then(res => {
                // Alert after successful downloading
                console.log('res -> ', JSON.stringify(res));
                alert('File Downloaded Successfully.');
            });
    };

    const getFileExtention = fileUrl => {
        // To get the file extension
        return /[.]/.exec(fileUrl) ?
            /[^.]+$/.exec(fileUrl) : undefined;
    };

    return [{ setUrl, url, postLink, loading, setVideoLink, videoLink, checkPermission,play,setPlay }]
}
