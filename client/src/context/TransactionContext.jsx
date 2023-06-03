import React, { useEffect, useState } from "react";
import { Web3Provider } from '@ethersproject/providers';
import { contractABI, contractAddress } from "../utils/constants";
import { ethers,parseEther } from "ethers";
import { BigNumber } from "bignumber.js"







export const TransactionContext = React.createContext();

const { ethereum } = window;
const provider = new Web3Provider(ethereum);

const getEthereumContract = () => {
    const signer= provider.getSigner();
    const transactioncontract  = new ethers.Contract(contractAddress, contractABI, signer);

    return transactioncontract;
}

export const TransactionProvider = ({children}) =>{
  

     const [currentAccount, setCurrentAccount] = useState("");
     const [formData, setFormData] = useState({addressTo: "", amount: "", keyword: "", message: "" });
     const [isLoading, setIsLoading] = useState(false); 
     const [transactionCount, settransactionCount] = useState(localStorage.getItem('transactionCount'));
     const [transactions, setTransactions] = useState([]);
  

     const handleChange = (e, name) =>{
        setFormData((prevState) => ({...prevState, [name]: e.target.value}));
     }

    const getAllTransactions = async () => {
      try {
        if (!ethereum) return alert("Please install MetaMask.");
        const transactionContract = getEthereumContract();

        const availableTransactions = await transactionContract.getAllTransactions();
        
        const structuredTransactions = availableTransactions.map((transaction) => {
          const timestamp = new BigNumber(transaction.timestamp);
          const amount = Number(transaction.amount);
          
          return {
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: new Date(timestamp.toNumber() * 1000).toLocaleString(),
            message: transaction.message,
            keyword: transaction.keyword,
            amount: (amount / 10 ** 18).toString(),
            
          };
        });
        
        console.log(structuredTransactions)
        setTransactions(structuredTransactions);
        console.log(availableTransactions)
      } catch (error) {
         console.log(error)
      }
    }
    const checkIfWalletIsConnect = async () => {
      try{
          if (!ethereum) return alert("Please install MetaMask.");
    
          const accounts = await ethereum.request({ method: "eth_accounts" });

         if(accounts.length){
            setCurrentAccount(accounts[0]);
            getAllTransactions()
          
         }else{
            console.log(' no accounts found')
         }
        }
        catch(error){
            console.log(error);
    
          throw new Error("No ethereum object");

        }

    }
    
    const checkIfTransactionsExist = async () => {
      try {
        const transactionContract = getEthereumContract();
        const transactionCount = await transactionContract.getTransactionCount()
        
        window.localStorage.setItem("transactionCount",transactionCount)
        
      } catch (error) {
        console.log(error)
        throw new Error("No ethereum object");
      }
    }

    const connectWallet = async () => {
        try {
          if (!ethereum) return alert("Please install MetaMask.");
    
          const accounts = await ethereum.request({ method: "eth_requestAccounts", });
    
          setCurrentAccount(accounts[0]);
        } catch (error) {
          console.log(error)+54 
    
          throw new Error("No ethereum object");
        }
      };

      const sendTransaction = async () =>{
        try{
            if (!ethereum) return alert("Please install MetaMask.");
            const {addressTo, amount, keyword, message} = formData;
             const transactionContract = getEthereumContract();
             const parsedAmount = parseEther(amount).toString();
             await ethereum.request({

              method: 'eth_sendTransaction',
              params:[{
                from: currentAccount,
                to: addressTo,
                gas: '0x5208',
                value: parsedAmount,
              }]


             })

             const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
             setIsLoading(true);
             window.alert(`Loading - ${transactionHash.hash}`);
             provider.waitForTransaction(transactionHash.hash);
             setIsLoading(false);
             window.alert(`Success - ${transactionHash.hash}`);

             const transactionCount = await transactionContract.getTransactionCount()

             settransactionCount(transactionCount);

        }catch(error){
            console.log(error);
    
            throw new Error("do ethereum object");
        }

      }

    useEffect(() => {
        checkIfWalletIsConnect();
        checkIfTransactionsExist();
        

    },[]);
    
    return (
        <TransactionContext.Provider value={{ connectWallet , currentAccount , formData , setFormData , handleChange, sendTransaction,transactions,isLoading}}>
            {children}
        </TransactionContext.Provider>
    );
}


