export const code = `/** Rust is awesome */
#[derive(Debug)]
struct Person<'a> {
  name: &'a str,
}

macro_rules! create_vec {
  ($($x:expr),*) => {
    {
      let mut temp_vec = Vec::new();
      $(
        temp_vec.push($x);
      )*
      temp_vec
    }
  };
}

fn main(){
  let vec = create_vec![1,2,3];
  println!("{:?}", vec);
  
  let p = Person { name: "Rasoul" };
  println!("Hello, {}!", p.name);
  println!("{:?}", p);
}
`;
