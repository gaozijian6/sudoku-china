import React from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    Pressable,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LanguageModalProps {
    visible: boolean;
    onClose: () => void;
    currentLanguage: string;
    onSelectLanguage: (language: string) => void;
}

const LanguageModal: React.FC<LanguageModalProps> = ({
    visible,
    onClose,
    currentLanguage,
    onSelectLanguage,
}) => {
    const { t } = useTranslation();
    const languages = [
        { code: 'en', label: 'English' }, // 英语
        { code: 'zh_CN', label: '中文（简体）' }, // 简体中文
        { code: 'zh_TW', label: '中文（繁體）' }, // 繁体中文
        { code: 'ja', label: '日本語' }, // 日语
        { code: 'ko', label: '한국어' }, // 韩语
        { code: 'fr', label: 'Français' }, // 法语
        { code: 'de', label: 'Deutsch' }, // 德语
        { code: 'es', label: 'Español' }, // 西班牙语
        { code: 'it', label: 'Italiano' }, // 意大利语
        { code: 'pt', label: 'Português' }, // 葡萄牙语
        { code: 'ru', label: 'Русский' }, // 俄语
        { code: 'hi', label: 'हिन्दी' }, // 印地语
        { code: 'tr', label: 'Türkçe' }, // 土耳其语
        { code: 'vi', label: 'Tiếng Việt' }, // 越南语
        { code: 'th', label: 'ไทย' }, // 泰语
        { code: 'uk', label: 'Українська' }, // 乌克兰语
        { code: 'nl', label: 'Nederlands' }, // 荷兰语
    ];

    const handleLanguageSelect = async (langCode: string) => {
        try {
            await AsyncStorage.setItem('userLanguage', langCode);
            onSelectLanguage(langCode);
        } catch (error) {
            console.error('保存语言设置失败:', error);
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <ScrollView>
                        {languages.map((lang) => (
                            <TouchableOpacity
                                key={lang.code}
                                style={styles.languageItem}
                                onPress={() => handleLanguageSelect(lang.code)}
                            >
                                <Text style={styles.languageText}>{lang.label}</Text>
                                {currentLanguage === lang.code && (
                                    <Text style={styles.checkmark}>✓</Text>
                                )}
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <Pressable style={styles.cancelButton} onPress={onClose}>
                        <Text style={styles.cancelText}>{t('cancel')}</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '80%',
        padding: 20,
        maxHeight: '80%',
        height: '60%',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    languageItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    languageText: {
        fontSize: 16,
        color: '#333',
    },
    checkmark: {
        color: 'rgb(91,139,241)',
        fontSize: 18,
    },
    cancelButton: {
        marginTop: 20,
        paddingVertical: 10,
        alignItems: 'center',
    },
    cancelText: {
        color: 'rgb(91,139,241)',
        fontSize: 16,
    },

});

export default LanguageModal; 