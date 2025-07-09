import AsyncStorage from '@react-native-async-storage/async-storage';
export const saveRegistrationProcess = async (screenName, data) => {
  try {
    const key = `registration_process_${screenName}`;

    // Validate before saving
    const safeData = JSON.stringify(data, (key, value) => {
      if (typeof value === 'function') return undefined;
      return value;
    });

    await AsyncStorage.setItem(key, safeData);

    console.log(`Progress saved for screen: ${screenName}`);
  } catch (error) {
    console.log('Error saving the progress:', error);
  }
};


export const getRegistrationProcess = async screenName => {
    try {
        const key = `registration_process_${screenName}`;
        const data = await AsyncStorage.getItem(key);
        return data!==null ? JSON.parse(data) : null;
    }
    catch(error){
        console.log("Error retrieving the progress",error);
    }
};