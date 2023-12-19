package com.example.kotlin_compose

import android.media.Image
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.example.kotlin_compose.ui.theme.Kotlin_ComposeTheme
import androidx.compose.material3.Button
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.ui.unit.dp
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Scaffold
import androidx.compose.material3.ScrollableTabRow
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.VerticalAlignmentLine
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.sp
import org.intellij.lang.annotations.JdkConstants.HorizontalAlignment



class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            Kotlin_ComposeTheme {

                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {

                    Column(modifier = Modifier
                        .fillMaxSize(),
                        //verticalArrangement = Arrangement.SpaceEvenly
                        verticalArrangement = Arrangement.spacedBy(20.dp)
                    )
                    {
                        NavBar()
                        ImageFun()
                        ButtonRow()
                        ButtonRow()
                        TextfieldFun()
                    }
                }

            }
        }
    }
}


@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(
        text = "Hello $name!",
        modifier = modifier
    )
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun NavBar() {
    Surface(
        modifier = Modifier
            .fillMaxWidth()
            .height(70.dp),
        color = colorResource(id = R.color.AndroidGreen),


    ) {
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            contentAlignment = Alignment.CenterStart
        ){
            Text(text="Example 1",
                fontSize = 18.sp,
                color = Color.White)
        }

    }

}


@Composable
fun ImageFun(){
    Box(
        modifier = Modifier.fillMaxWidth(),
        contentAlignment = Alignment.Center

    )
    {
        Image(
        painter = painterResource(id = R.drawable.penguin),
        contentDescription = null,
        modifier = Modifier
            .size(170.dp)
            .align(Alignment.Center)

    )}

}

@Composable
fun ButtonRow(){
    Box(
        modifier = Modifier.fillMaxWidth(),
        contentAlignment = Alignment.Center
    ){
        Row(
          //  modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(16.dp)


        ){
            ButtonFun()
            ButtonFun()
        }
    }

}

@Composable
fun ButtonFun(){
    Button(onClick ={},
        colors = ButtonDefaults.buttonColors(
            containerColor = Color.LightGray,
            contentColor = Color.Black)
    ){
        Text("BUTTON")
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TextfieldFun(){
    Box(
        modifier = Modifier.fillMaxWidth(),
        contentAlignment = Alignment.Center
    ){
        Row(
            horizontalArrangement = Arrangement.spacedBy(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ){

            var text = remember {mutableStateOf("")}
            val textFieldColors = colorResource(id = R.color.Pink)

            Text("Email")
            TextField(
                value = text.value,
                onValueChange = {text.value = it},
                textStyle = TextStyle(color = colorResource(R.color.Pink)),
                colors = TextFieldDefaults.textFieldColors(
                    focusedIndicatorColor = textFieldColors,
                    unfocusedIndicatorColor = textFieldColors,
                    cursorColor = textFieldColors,
                    containerColor = Color.Transparent)
            )
        }

    }

}


@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    Kotlin_ComposeTheme {
    }
}