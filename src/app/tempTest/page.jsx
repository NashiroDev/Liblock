"use client"

import Navbar from "../../partials/navbar"
import Footer from "../../partials/footer"
import { useAccount, useConnect, useDisconnect } from 'wagmi'

import { SendTransaction } from '../hooks/sendTransactions'

export default function Index() {

    const { isConnected } = useAccount()

    if (isConnected) {
        return (
            <div>
                <Navbar />
                <SendTransaction />
                <Footer />
            </div>
        )
    }
}