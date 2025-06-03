import { Modal, TextInput } from 'react-native';

const [modalVisible, setModalVisible] = useState(false);
const [newImage, setNewImage] = useState(null);
const [description, setDescription] = useState('');