import { useEffect, useMemo, useState } from 'react';
import { base44 } from '@/api/base44Client';
import DashboardHeader from '@/components/money/DashboardHeader';
import SummaryCards from '@/components/money/SummaryCards';
import SpendingChart from '@/components/money/SpendingChart';
import TransactionList from '@/components/money/TransactionList';
import TransactionDialog from '@/components/money/TransactionDialog';
import SavingsSection from '@/components/money/SavingsSection';
import ProgressChart from '@/components/money/ProgressChart';
import IncomeExpenseDonut from '@/components/money/IncomeExpenseDonut';
import AchievementList from '@/components/achievements/AchievementList';
import { checkSavingsAchievements } from '@/lib/achievements';

export default function Home() {
  const [transactions,setTransactions]=useState([]),[goals,setGoals]=useState([]),[open,setOpen]=useState(false),[loading,setLoading]=useState(true);
  const load=async()=>{const [tx,sg]=await Promise.all([base44.entities.Transaction.list('-date'),base44.entities.SavingsGoal.list('-created_date')]);setTransactions(tx);setGoals(sg);setLoading(false);checkSavingsAchievements(sg).catch(()=>{});};
  useEffect(()=>{load();},[]);
  const monthTransactions=useMemo(()=>{const now=new Date();return transactions.filter(t=>{const d=new Date(`${t.date}T00:00:00`);return d.getMonth()===now.getMonth()&&d.getFullYear()===now.getFullYear();});},[transactions]);
  const income=monthTransactions.filter(t=>t.type==='income').reduce((s,t)=>s+t.amount,0),spent=monthTransactions.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amount,0);
  const chartData=Object.entries(monthTransactions.filter(t=>t.type==='expense').reduce((a,t)=>({...a,[t.category]:(a[t.category]||0)+t.amount}),{})).map(([name,value])=>({name,value}));
  const addTransaction=async data=>{const item=await base44.entities.Transaction.create(data);setTransactions(prev=>[item,...prev]);setOpen(false);};
  const deleteTransaction=async id=>{await base44.entities.Transaction.delete(id);setTransactions(prev=>prev.filter(t=>t.id!==id));};
  const createGoal=async data=>{const goal=await base44.entities.SavingsGoal.create(data);setGoals(prev=>[goal,...prev]);};
  const contribute=async(goal,amount)=>{const updated=await base44.entities.SavingsGoal.update(goal.id,{saved_amount:goal.saved_amount+amount});const newGoals=goals.map(g=>g.id===goal.id?updated:g);setGoals(newGoals);checkSavingsAchievements(newGoals).catch(()=>{});};
  const deleteGoal=async id=>{await base44.entities.SavingsGoal.delete(id);setGoals(prev=>prev.filter(g=>g.id!==id));};
  if(loading)return <div className="grid min-h-screen place-items-center"><div className="h-9 w-9 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600"/></div>;
  return <div id="overview" className="mx-auto max-w-7xl px-4 py-7 sm:px-8 sm:py-10"><DashboardHeader onAdd={()=>setOpen(true)}/><div className="mt-8"><SummaryCards income={income} spent={spent}/></div><div className="mt-5"><IncomeExpenseDonut income={income} spent={spent}/></div><div className="mt-5 grid gap-5 xl:grid-cols-[1.05fr_.95fr]"><SpendingChart data={chartData}/><TransactionList transactions={monthTransactions} onDelete={deleteTransaction}/></div><div className="mt-5"><ProgressChart transactions={transactions}/></div><div className="mt-5"><SavingsSection goals={goals} onCreate={createGoal} onContribute={contribute} onDelete={deleteGoal}/></div><div className="mt-5"><AchievementList/></div><TransactionDialog open={open} onClose={()=>setOpen(false)} onSave={addTransaction}/></div>;
}