function show(value){
document.getElementById('banga').style.visibility='hidden';
document.getElementById('delh').style.visibility='hidden';
document.getElementById('mumb').style.visibility='hidden';
document.getElementById('kere').style.visibility='hidden';
document.getElementById('hyde').style.visibility='hidden';
document.getElementById('banga').style.display='none';
document.getElementById('delh').style.display='none';
document.getElementById('mumb').style.display='none';
document.getElementById('kere').style.display='none';
document.getElementById('hyde').style.display='none';
if (value== 'banga')
{
    document.getElementById('banga').style.visibility='visible';
    document.getElementById('banga').style.display='flex';
}
if (value== 'delh')
{
    document.getElementById('delh').style.visibility='visible';
    document.getElementById('delh').style.display='flex';
}
if (value== 'mumb')
{
    document.getElementById('mumb').style.visibility='visible';
    document.getElementById('mumb').style.display='flex';
}
if (value== 'kere')
{
    document.getElementById('kere').style.visibility='visible';
    document.getElementById('kere').style.display='flex';
}
if (value== 'hyde')
{
    document.getElementById('hyde').style.visibility='visible';
    document.getElementById('hyde').style.display='flex';
}
}