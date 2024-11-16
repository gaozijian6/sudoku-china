import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCpiPMoI-ICry0ngFjiHfd1__n_ufP-3AU",
  authDomain: "sudoku-28cce.firebaseapp.com",
  projectId: "sudoku-28cce",
  storageBucket: "sudoku-28cce.firebasestorage.app",
  messagingSenderId: "899975076561",
  appId: "1:899975076561:android:07823ba950b65f65bfc3f0"
};

// 初始化 Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// 获取 Firestore 实例
const db = getFirestore(app);

export { app, db };