# Proje Hakkında Genel Bilgiler

Projenin hızlı render edilmesi için vite kullanıldı.Projede hem typescript hem react kullanıldı.Responsive bir yapı oluşturuldu.Dummyjson Fake Data Apisi kullanıldı gerekli verileri almak için. Bu verileri Redux,Redux-Toolkit aracığıyla fetchleyip daha sonrasında createAsyncThunk ile başarılı bekleniyor ve başarısız 3 farklı state yapısı oluşturuldu. Fetchlenen ürünler thunk action bu 3 farklı durumda ne yapılacağını belirtir. Örneğin api çağrısı başarısız olursa state içindeki 'Status' alanı failed değeri alır.

# Projeyi Ayağa kaldırmak için

1-)`https://github.com/Alperenyilan/Frontend-Developer-Assignment-Done.git `

2-) `npm Install`

3-) `npm run dev`


# Tech Stack

React,React-Slick,React-router-dom,Vite,Typescript,Redux,Redux-toolkit,dummyjson,Redux Thunk
