export default function useHelper() {
    function hello() {
        console.log('Hello from helper');
    }

    return {
        hello,
    };
}